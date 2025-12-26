import { ToastProps } from "@blueprintjs/core";
import { isError, noop } from "lodash";
import { LoginResponseDto, ResultDto, SettingsDto, ValidationErrorDto } from "../../../../common/dto";
import { runSerial } from "../../../../common/util";
import { ApiInfoDto } from "../../dto";
import { MtgServer, ShowToastFn } from "../../types";
import { ICollectionManagerProxyService, ISessionService } from "../interface";
import { ApiStatusChangeListener } from "../providers";

export class CollectionManagerProxyService implements ICollectionManagerProxyService {
  // #region Private fields ---------------------------------------------------
  private readonly refreshInterval: number;
  private _logServerResponses: boolean;
  private showToast!: (props: ToastProps, key?: string) => void;
  private apiRoots: Map<MtgServer, string>;
  private _apiStatus: Map<MtgServer, ApiInfoDto | null>;
  private listeners: Array<ApiStatusChangeListener>;
  private refreshing: Promise<void> | null;
  private intervalId: NodeJS.Timeout | null;
  private jwt: string | null;
  private unsubscribeSession: (() => void) | null;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get apiStatus(): Map<MtgServer, ApiInfoDto | null> {
    return this._apiStatus;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._logServerResponses = false;
    this.apiRoots = new Map<MtgServer, string>();
    this._apiStatus = new Map<MtgServer, ApiInfoDto>();
    this.listeners = new Array<ApiStatusChangeListener>();
    this.refreshing = null;
    this.intervalId = null;
    this.refreshInterval = 60000;
    this.jwt = null;
    this.unsubscribeSession = null;
  }

  // #endregion

  // #region ICollectionManagerProxyService Members ---------------------------
  public get logServerResponses(): boolean {
    return this._logServerResponses;
  }

  public async getData<T extends object>(
    server: MtgServer,
    path: string,
    suppressSuccessMessage = true,
    supressErrorMessage = false
  ): Promise<T> {
    return this.sendRequest("GET", server, path, null, suppressSuccessMessage, supressErrorMessage);
  }

  public initialize(
    sessionService: ISessionService,
    configuration: SettingsDto
  ): void {
    this._logServerResponses = configuration.preferences.logServerResponses;
    if (this.unsubscribeSession == null) {
      this.unsubscribeSession = sessionService.subscribe((data: LoginResponseDto | null) => {
        this.jwt = data ? data.token : null;
      });
    }
    if (configuration.apiConfiguration != null) {
      this.apiRoots.set("authentication", configuration.apiConfiguration.authenticationApiRoot);
      this.apiRoots.set("library", configuration.apiConfiguration.libraryApiRoot);
      this.apiRoots.set("collection", configuration.apiConfiguration.collectionApiRoot);
      this.apiRoots.set("deck", configuration.apiConfiguration.deckApiRoot);
    }
  }

  public setShowToast(showToast: ShowToastFn): void {
    this.showToast = showToast;
  }

  public postData<Req extends object, Res extends object>(server: MtgServer, path: string, data: Req | null, suppressSuccessMessage: boolean): Promise<Res> {
    return this.sendRequest("POST", server, path, data, suppressSuccessMessage, false);
  }

  public putData<Req extends object, Res extends object>(server: MtgServer, path: string, data: Req | null, suppressSuccessMessage: boolean): Promise<Res> {
    return this.sendRequest("PUT", server, path, data, suppressSuccessMessage, false);
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

  public subscribe(listener: ApiStatusChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
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
      console.log(reason);
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
          message: message,
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
  private processErrorResponse<T>(path: string, response: ResultDto<T>, suppressErrorMessage: boolean): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(response);
    }

    let message: Array<string>;
    if (response.errors) {
      message = response.errors;
    } else {
      message = response.validationErrors.map((v: ValidationErrorDto) => v.errorMessage);
    }
    if (!suppressErrorMessage) {
      this.showToast(
        {
          message: message ?? "Some error occurred",
          intent: "danger",
          isCloseButtonShown: true,
          icon: "warning-sign"
        },
        path
      );
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
      console.log(resultDto);
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
    verb: "GET" | "POST" | "PUT" | "PATCH",
    server: MtgServer,
    path: string,
    data: Req | null,
    suppressSuccessMessage: boolean,
    suppressErrorMessage: boolean
  ): Promise<Res> {
    let result: Promise<Res>;
    try {
      return fetch(
        this.buildPath(server, path),
        {
          method: verb,
          body: (data != null) ? JSON.stringify(data) : null,
          headers: this.buildHeaders()
        })
        .then(
          async (response: Response) => {
            const resultDto: ResultDto<Res> = (await response.json()) as ResultDto<Res>;
            if (response.status >= 400) {
              return this.processErrorResponse(path, resultDto, suppressErrorMessage);
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
    return this.apiRoots.get(server) + path;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "accept": "application/json",
      "Content-Type": "application/json"
    };
    // if (this.sessionService.jwt != null) {
    if (this.jwt != null) {
      headers["Authorization"] = "Bearer " + this.jwt;
    }
    return headers;
  }

  private async refreshApiStatus(): Promise<void> {
    if (this.refreshing == null) {
      const taskParameters = Array.of(...this.apiRoots.keys());
      this.refreshing = runSerial(
        taskParameters,
        (server: MtgServer) => {
          return this.getData<ApiInfoDto>(server, "/public/system/info", true, true)
            .then(
              (info: ApiInfoDto) => this._apiStatus.set(server, info),
              () => this._apiStatus.set(server, null)
            )
            .then(noop);
        }
      ).then(() => {
        this.listeners.forEach((listener: ApiStatusChangeListener) => listener(this._apiStatus));
      });

      await this.refreshing.finally(() => this.refreshing = null);
    }
  }
  // #endregion
}
