import { ToastProps } from "@blueprintjs/core";
import { isError, noop } from "lodash";
import { LoginResponseDto, PreferencesDto, ResultDto, SettingsDto, ValidationErrorDto } from "../../../../common/dto";
import { runSerial } from "../../../../common/util";
import { ApiInfoDto } from "../../dto";
import { MtgServer, ShowToastFn } from "../../types";
import { IArcaneArchiveProxyService, IConfigurationService, ISessionService } from "../interface";
import { ApiStatusChangeListener } from "../providers";
import { ArcaneArchiveRequestOptions, InvalidSessionListener } from "../types";

export class ArcaneArchiveProxyService implements IArcaneArchiveProxyService {
  // #region Private fields ---------------------------------------------------
  private readonly refreshInterval: number;
  private logServerResponses: boolean;
  private showToast!: (props: ToastProps, key?: string) => void;
  private _apiRoots: Map<MtgServer, string>;
  private _apiStatus: Map<MtgServer, ApiInfoDto | null>;
  private statusChangeListeners: Array<ApiStatusChangeListener>;
  private refreshing: Promise<void> | null;
  private intervalId: NodeJS.Timeout | null;
  private jwt: string | null;
  private unsubscribeSession: (() => void) | null;
  private unsubscribePreferences: (() => void) | null;
  private invalidSessionListeners: Array<InvalidSessionListener>;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get apiStatus(): Map<MtgServer, ApiInfoDto | null> {
    return this._apiStatus;
  }

  public get apiRoots(): Map<MtgServer, string> {
    return this._apiRoots;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.logServerResponses = false;
    this._apiRoots = new Map<MtgServer, string>();
    this._apiStatus = new Map<MtgServer, ApiInfoDto>();
    this.statusChangeListeners = new Array<ApiStatusChangeListener>();
    this.refreshing = null;
    this.intervalId = null;
    this.refreshInterval = 60000;
    this.jwt = null;
    this.unsubscribeSession = null;
    this.unsubscribePreferences = null;
    this.invalidSessionListeners = new Array<InvalidSessionListener>();
  }

  // #endregion

  // #region IArcaneArchiveProxyService Members ---------------------------
  public delete(server: MtgServer, path: string): Promise<number> {
    return this.sendRequest<never, never>("DELETE", server, path, null)
      .then(() => 1);
  }

  public subscribeInvalidSessionListener(listener: InvalidSessionListener): () => void {
    this.invalidSessionListeners.push(listener);
    return () => {
      this.invalidSessionListeners = this.invalidSessionListeners.filter(l => l !== listener);
    };
  }

  public getData<T extends object>(
    server: MtgServer,
    path: string,
    options?: ArcaneArchiveRequestOptions
  ): Promise<T> {
    return this.sendRequest("GET", server, path, null, options);
  }

  public initialize(
    configurationService: IConfigurationService,
    sessionService: ISessionService,
    configuration: SettingsDto
  ): void {
    this.logServerResponses = configuration.preferences.logServerResponses;
    if (this.unsubscribeSession == null) {
      this.unsubscribeSession = sessionService.subscribeSessionChangeListener((data: LoginResponseDto | null) => {
        this.jwt = data ? data.token : null;
      });
    }
    if (this.unsubscribePreferences == null) {
      this.unsubscribePreferences = configurationService.subscribe((data: PreferencesDto) => {
        this.logServerResponses = data.logServerResponses;
      });
    }

    if (configuration.apiConfiguration != null) {
      this._apiRoots.set("authentication", configuration.apiConfiguration.authenticationApiRoot);
      this._apiRoots.set("library", configuration.apiConfiguration.libraryApiRoot);
      this._apiRoots.set("collection", configuration.apiConfiguration.collectionApiRoot);
      this._apiRoots.set("deck", configuration.apiConfiguration.deckApiRoot);
    }
  }

  public setShowToast(showToast: ShowToastFn): void {
    this.showToast = showToast;
  }

  public postData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string, data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    return this.sendRequest("POST", server, path, data, options);
  }

  public putData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    return this.sendRequest("PUT", server, path, data, options);
  }

  public async forceRefresh(): Promise<Map<MtgServer, ApiInfoDto | null>> {
    if (this.refreshing != null) {
      // -- if currently refreshing: just wait for the result --
      await this.refreshing;
    } else {
      // -- else: stop, refresh and restart if refresh was running ---
      const wasRunning = this.stopRefreshing();
      await this.refreshApiStatus();
      if (wasRunning) {
        this.startRefreshing();
      }
    }
    return this._apiStatus;
  }

  public async startRefreshing(): Promise<Map<MtgServer, ApiInfoDto | null>> {
    // --- execute once immediately ---
    await this.refreshApiStatus();
    // --- schedule ---
    if (this.intervalId == null) {
      this.intervalId = setInterval(
        () => void this.refreshApiStatus(),
        this.refreshInterval
      );
    }
    return this._apiStatus;
  }

  public stopRefreshing(): boolean {
    let result: boolean = false;
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      result = true;
    }
    return result;
  }

  public subscribeApiStatusChangeListener(listener: ApiStatusChangeListener): () => void {
    this.statusChangeListeners.push(listener);
    return () => {
      this.statusChangeListeners = this.statusChangeListeners.filter(l => l !== listener);
    };
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  /**
   * Process the rejection of the fetch call by showing a toast.
   * Logs the response to the console if this is configured.
   *
   * @param path   the path that was supposed to be fetched
   * @param reason the rejection reason
   * @returns      a rejected promise, with the same reason
   */
  private processRejection<T>(path: string, reason: Error, suppressErrorMessage: boolean): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log({ path: path, response: reason });
    }

    let message: string;
    // Detect unreachable server (ERR_CONNECTION_REFUSED → "Failed to fetch")
    if (reason.message?.includes("Failed to fetch")) {
      message = "Cannot connect to the server.";
    } else {
      message = reason.message ?? "An unexpected error occurred.";
    }

    if (!suppressErrorMessage) {
      void this.showToast(
        {
          message: `${(message ?? "Some error occurred")} (${path})`,
          intent: "danger",
          isCloseButtonShown: true,
          icon: "warning-sign"
        },
        path
      );
    }
    return Promise.reject<T>(reason);
  }

  /**
   * Process a ResultDto with a status greater than or equal to 400 by showing a toast.
   * Logs the response to the console if this is configured
   * @param path the fetched path
   * @param response the resultDto
   * @returns    A rejected promise
   */
  private processErrorResponse<T>(
    path: string,
    response: ResultDto<T>,
    suppressErrorMessage: boolean,
    suppressInvalidSessionHandling: boolean): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log({ path: path, response: response });
    }
    if (response.status == "UNAUTHORIZED") {
      // TODO check if we can differentiate between expired sessions, JWT's or just a call to a method requiring a session
      this.invalidSessionListeners.forEach(l => l());
      if (!suppressInvalidSessionHandling) {
        this.showToast(
          {
            message: "Your session has expired, please login again",
            intent: "warning",
            icon: "warning-sign",
            timeout: 0, // do not close automatically
            isCloseButtonShown: true
          }
        );
      }
    } else {
      let message: Array<string>;
      if (response.errors) {
        message = response.errors;
      } else {
        message = response.validationErrors.map((v: ValidationErrorDto) => v.errorMessage);
      }

      if (!suppressErrorMessage) {
        this.showToast(
          {
            message: `${(message ?? "Some error occurred")} (${path})`,
            intent: "danger",
            isCloseButtonShown: true,
            icon: "warning-sign"
          },
          path
        );
      }
    }
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }

  /**
   * Process a ResultDto with a status less than 400.
   * Logs the response to the console if this is configured
   * @param resultDto the resultDto
   * @returns the data contained in the ResultDto
   */
  private processSuccessResponse<T>(path: string, resultDto: ResultDto<T>, suppressSuccessMessage: boolean): T {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log({ path: path, response: resultDto });
    }
    if (resultDto.successMessage && !suppressSuccessMessage) {
      void this.showToast(
        {
          message: resultDto.successMessage,
          intent: "success",
          isCloseButtonShown: true,
          icon: "tick"
        },
        path
      );
    }
    return resultDto.data!;
  }

  private sendRequest<Req extends object, Res extends object>(
    verb: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    server: MtgServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    const suppressSuccessMessage = options?.suppressSuccessMessage || true;
    const suppressErrorMessage = options?.suppressErrorMessage || false;
    const suppressInvalidSessionHandling = options?.suppressInvalidSessionHandling || false;
    let result: Promise<Res>;
    try {
      return fetch(
        this.buildPath(server, path),
        {
          method: verb,
          body: (data != null) ? JSON.stringify(data) : null,
          headers: this.buildHeaders(),
          credentials: server == "authentication" ? "include" : undefined
        })
        .then(
          async (response: Response) => {
            let resultDto: ResultDto<Res>;
            if (response.status == 204) {
              resultDto = { status: "204" } as ResultDto<Res>;
            } else {
              resultDto = (await response.json()) as ResultDto<Res>;
            }
            if (response.status >= 400) {
              return this.processErrorResponse(path, resultDto, suppressErrorMessage, suppressInvalidSessionHandling);
            } else {
              return this.processSuccessResponse(path, resultDto, suppressSuccessMessage);
            }
          },
          (reason: Error) => this.processRejection<Res>(path, reason, suppressErrorMessage)
        );
    } catch (reason: unknown) {
      if (isError(reason)) {
        result = this.processRejection<Res>(path, reason, suppressErrorMessage);
      } else {
        result = this.processRejection<Res>(path, new Error("Unknown error"), suppressErrorMessage);
      }
    }
    return result;
  }

  private buildPath(server: MtgServer, path: string): string {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    return this._apiRoots.get(server) + path;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "accept": "application/json",
      "Content-Type": "application/json"
    };
    if (this.jwt != null) {
      headers["Authorization"] = "Bearer " + this.jwt;
    }
    return headers;
  }

  private async refreshApiStatus(): Promise<void> {
    if (this.refreshing == null) {
      const taskParameters = Array.of(...this._apiRoots.keys());
      this.refreshing = runSerial(
        taskParameters,
        (server: MtgServer) => {
          return this.getData<ApiInfoDto>(
            server,
            "/public/system/info",
            { suppressSuccessMessage: true, suppressErrorMessage: true, suppressInvalidSessionHandling: server == "library" }
          )
            .then(
              (info: ApiInfoDto) => this._apiStatus.set(server, info),
              () => this._apiStatus.set(server, null)
            )
            .then(noop);
        }
      ).then(() => {
        this.statusChangeListeners.forEach((listener: ApiStatusChangeListener) => listener(this._apiStatus));
      });

      await this.refreshing.finally(() => this.refreshing = null);
    }
  }
  // #endregion
}
