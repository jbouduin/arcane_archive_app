import { ToastProps } from "@blueprintjs/core";
import { ResultDto, SettingsDto, ValidationErrorDto } from "../../../../common/dto";
import { MtgServer } from "../../types";
import { ICollectionManagerProxyService, ISessionService } from "../interface";

export class CollectionManagerProxyService implements ICollectionManagerProxyService {
  // #region Private fields ---------------------------------------------------
  private _logServerResponses: boolean;
  private showToast!: (props: ToastProps, key?: string) => void;
  private apiRoots: Map<MtgServer, string>;
  private sessionService!: ISessionService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._logServerResponses = false;
    this.apiRoots = new Map<MtgServer, string>();
  }
  // #endregion

  // #region ICollectionManagerProxyService Members ---------------------------
  public get logServerResponses(): boolean {
    return this._logServerResponses;
  }

  public async getData<T extends object>(server: MtgServer, path: string, suppressSuccessMessage = true): Promise<T> {
    return this.sendRequest("GET", server, path, null, suppressSuccessMessage);
  }

  public initialize(sessionService: ISessionService, configuration: SettingsDto, showToast: (props: ToastProps, key?: string) => void): void {
    this._logServerResponses = configuration.preferences.logServerResponses;
    this.showToast = showToast;
    this.sessionService = sessionService;
    this.apiRoots.set("authentication", configuration.apiConfiguration.authenticationApiRoot);
    this.apiRoots.set("library", configuration.apiConfiguration.libraryApiRoot);
    this.apiRoots.set("collection", configuration.apiConfiguration.collectionApiRoot);
    this.apiRoots.set("deck", configuration.apiConfiguration.deckApiRoot);
  }

  public postData<Req extends object, Res extends object>(server: MtgServer, path: string, data: Req | null, suppressSuccessMessage: boolean): Promise<Res> {
    return this.sendRequest("POST", server, path, data, suppressSuccessMessage);
  }

  public putData<Req extends object, Res extends object>(server: MtgServer, path: string, data: Req | null, suppressSuccessMessage: boolean): Promise<Res> {
    return this.sendRequest("PUT", server, path, data, suppressSuccessMessage);
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
  private processRejection<T>(path: string, reason: Error): Promise<T> {
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

    void this.showToast(
      {
        message: message,
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      path
    );
    return Promise.reject<T>(reason);
  }

  /**
   * Process a ResultDto with a status greater than or equal to 400 by showing a toast.
   * Logs the response to the console if this is configured
   * @param path the fetched path
   * @param response the resultDto
   * @returns    A rejected promise
   */
  private processErrorResponse<T>(path: string, response: ResultDto<T>): Promise<T> {
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
    void this.showToast(
      {
        message: message ?? "Some error occurred",
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      path
    );
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }

  /**
   * Process a ResultDto with a status less than 400.
   * Logs the response to the console if this is configured
   * @param resultDto the resultDto
   * @returns the data contained in the ResultDto
   */
  private processSuccessResponse<T>(path: string, resultDto: ResultDto<T>, suppressSuccessMessage?: boolean): T {
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
    suppressSuccessMessage: boolean): Promise<Res> {
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
            return this.processErrorResponse(path, resultDto);
          } else {
            return this.processSuccessResponse(path, resultDto, suppressSuccessMessage);
          }
        },
        (reason: Error) => this.processRejection(path, reason)
      );
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
    if (this.sessionService.jwt != null) {
      headers["Authorization"] = "Bearer " + this.sessionService.jwt;
    }
    return headers;
  }
  // #endregion
}
