import { isError, noop } from "lodash";
import {
  ApiConfigurationDto, ResultDto, SessionDto, SystemConfigurationDto, ValidationErrorDto
} from "../../../../common/dto";
import { LogLevel } from "../../../../common/enums";
import { ArcanArchiveServer, ResponseLogSetting, ResponseLogSource } from "../../../../common/types";
import { runSerial } from "../../../../common/util";
import { ApiInfoDto } from "../../dto";
import { ShowToastFn } from "../../types";
import { IArcaneArchiveProxy, IConfigurationService, ISessionService } from "../interface";
import { ApiStatus, ApiStatusChangeListener, ArcaneArchiveRequestOptions, InvalidSessionListener } from "../types";

export class ArcaneArchiveProxy implements IArcaneArchiveProxy {
  //#region Private fields ----------------------------------------------------
  private _apiRoots: Map<ArcanArchiveServer, string>;
  private _apiStatus: ApiStatus;
  private intervalId: NodeJS.Timeout | null;
  private invalidSessionListeners: Array<InvalidSessionListener>;
  private jwt: string | null;
  private readonly refreshInterval: number;
  private logLevels: Map<ResponseLogSource, LogLevel>;
  private refreshing: Promise<void> | null;
  private statusChangeListeners: Array<ApiStatusChangeListener>;
  private showToast!: ShowToastFn;
  private unsubscribeSession: (() => void) | null;
  private unsubscribeSystemConfiguration: (() => void) | null;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this._apiRoots = new Map<ArcanArchiveServer, string>();
    this._apiStatus = new Map<ArcanArchiveServer, ApiInfoDto>();
    this.intervalId = null;
    this.invalidSessionListeners = new Array<InvalidSessionListener>();
    this.jwt = null;
    this.logLevels = new Map<ResponseLogSource, LogLevel>();
    this.refreshInterval = 60000;
    this.refreshing = null;
    this.statusChangeListeners = new Array<ApiStatusChangeListener>();
    this.unsubscribeSession = null;
    this.unsubscribeSystemConfiguration = null;
  }
  //#endregion

  //#region IArcaneArchiveProxyService Members : Service methods --------------
  public initialize(apiConfiguration: ApiConfigurationDto | null): void {
    if (apiConfiguration != null) {
      this._apiRoots.set("authentication", apiConfiguration.authenticationApiRoot);
      this._apiRoots.set("library", apiConfiguration.libraryApiRoot);
      this._apiRoots.set("collection", apiConfiguration.collectionApiRoot);
      this._apiRoots.set("deck", apiConfiguration.deckApiRoot);
    }
  }

  public initializeSubscriptions(sessionService: ISessionService, configurationService: IConfigurationService): void {
    if (this.unsubscribeSession == null) {
      this.unsubscribeSession = sessionService.subscribeSessionChangeListener(
        (data: SessionDto | null) => this.jwt = data ? data.token : null
      );
    }
    if (this.unsubscribeSystemConfiguration == null) {
      this.unsubscribeSystemConfiguration = configurationService.subscribeSystemConfigurationChangeListener(
        (data: SystemConfigurationDto) => {
          this.logLevels.clear();
          data.responseLoggingConfiguration.forEach(
            (rls: ResponseLogSetting) => this.logLevels.set(rls.source, rls.level)
          );
        }
      );
    }
  }

  public setShowToast(showToast: ShowToastFn): void {
    this.showToast = showToast;
  }
  //#endregion

  //#region IArcaneArchiveProxyService Members - Data methods -----------------
  public delete(server: ArcanArchiveServer, path: string): Promise<number> {
    return this.sendRequest<never, never>("DELETE", server, path, null)
      .then(() => 1);
  }

  public getData<T extends object>(
    server: ArcanArchiveServer,
    path: string,
    options?: ArcaneArchiveRequestOptions
  ): Promise<T> {
    return this.sendRequest("GET", server, path, null, options);
  }

  public postData<Req extends object, Res extends object>(
    server: ArcanArchiveServer,
    path: string, data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    return this.sendRequest("POST", server, path, data, options);
  }

  public putData<Req extends object, Res extends object>(
    server: ArcanArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    return this.sendRequest("PUT", server, path, data, options);
  }
  //#endregion

  //#region Api Status / Session related methods ------------------------------
  public async forceRefresh(): Promise<Map<ArcanArchiveServer, ApiInfoDto | null>> {
    if (this.refreshing != null) {
      // -- if currently refreshing: just wait for the result --
      await this.refreshing;
    } else {
      // -- else: stop, refresh and restart if refresh was running ---
      const wasRunning = this.stopRefreshing();
      await this.refreshApiStatus();
      if (wasRunning) {
        void this.startRefreshing();
      }
    }
    return this._apiStatus;
  }

  public async startRefreshing(): Promise<Map<ArcanArchiveServer, ApiInfoDto | null>> {
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

  public subscribeInvalidSessionListener(listener: InvalidSessionListener): () => void {
    this.invalidSessionListeners.push(listener);
    return () => {
      this.invalidSessionListeners = this.invalidSessionListeners.filter(l => l !== listener);
    };
  }
  //#endregion

  // #region Auxiliary Methods ------------------------------------------------
  /**
   * Process the rejection of the fetch call by showing a toast.
   * Logs the response to the console if this is configured.
   *
   * @param path   the path that was supposed to be fetched
   * @param reason the rejection reason
   * @returns      a rejected promise, with the same reason
   */
  private processRejection<T>(
    server: ArcanArchiveServer,
    path: string,
    reason: Error,
    suppressErrorMessage: boolean
  ): Promise<T> {
    if (this.getLogLevel(server) <= 4) {
      // eslint-disable-next-line no-console
      console.error({ server: server, path: path, response: reason });
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
    server: ArcanArchiveServer,
    path: string,
    response: ResultDto<T>,
    suppressErrorMessage: boolean,
    suppressInvalidSessionHandling: boolean): Promise<T> {
    if (this.getLogLevel(server) <= 4) {
      // eslint-disable-next-line no-console
      console.error({ server: server, path: path, response: response });
    }
    if (response.status == "UNAUTHORIZED") {
      this.invalidSessionListeners.forEach(l => l());
      if (path == "/auth/login") {
        this.showToast(
          {
            message: "Invalid username or password",
            intent: "danger",
            icon: "error",
            isCloseButtonShown: true
          }
        );
      } else if (!suppressInvalidSessionHandling) {
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
  private processSuccessResponse<T>(
    server: ArcanArchiveServer,
    path: string,
    resultDto: ResultDto<T>,
    suppressSuccessMessage: boolean
  ): T {
    if (this.getLogLevel(server) <= 1) {
      // eslint-disable-next-line no-console
      console.log({ server: server, path: path, response: resultDto });
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
    server: ArcanArchiveServer,
    path: string,
    data: Req | null,
    options?: ArcaneArchiveRequestOptions
  ): Promise<Res> {
    if (this.getLogLevel(server) <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: verb, server: server, path: path, data: data });
    }
    const suppressSuccessMessage = options?.suppressSuccessMessage != undefined
      ? options?.suppressSuccessMessage
      : true;
    const suppressErrorMessage = options?.suppressErrorMessage != undefined
      ? options?.suppressErrorMessage
      : false;
    const suppressInvalidSessionHandling = options?.suppressInvalidSessionHandling != undefined
      ? options?.suppressInvalidSessionHandling
      : false;
    let result: Promise<Res>;
    try {
      return fetch(
        this.buildPath(server, path),
        {
          method: verb,
          body: (data != null) ? JSON.stringify(data) : null,
          headers: this.buildHeaders(),
          credentials: server == "authentication" ? "include" : undefined,
          signal: options?.signal
        }
      ).then(
        async (response: Response) => {
          let resultDto: ResultDto<Res>;
          if (response.status == 204) {
            resultDto = { status: "204" } as ResultDto<Res>;
          } else {
            resultDto = (await response.json()) as ResultDto<Res>;
          }
          if (response.status >= 400) {
            return this.processErrorResponse(
              server, path, resultDto, suppressErrorMessage, suppressInvalidSessionHandling
            );
          } else {
            return this.processSuccessResponse(server, path, resultDto, suppressSuccessMessage);
          }
        },
        (reason: Error) => this.processRejection<Res>(server, path, reason, suppressErrorMessage)
      );
    } catch (reason: unknown) {
      if (isError(reason)) {
        result = this.processRejection<Res>(server, path, reason, suppressErrorMessage);
      } else {
        result = this.processRejection<Res>(server, path, new Error("Unknown error"), suppressErrorMessage);
      }
    }
    return result;
  }

  private buildPath(server: ArcanArchiveServer, path: string): string {
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
        (server: ArcanArchiveServer) => {
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

  private getLogLevel(server: ArcanArchiveServer): LogLevel {
    return this.logLevels.get(server) || LogLevel.Error;
  }
  //#endregion
}
