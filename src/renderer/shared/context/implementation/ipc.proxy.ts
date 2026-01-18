import { SystemConfigurationDto } from "../../../../common/dto";
import { LogLevel } from "../../../../common/enums";
import { EIpcStatus, IpcChannel, IpcRequest, IpcResponse } from "../../../../common/ipc";
import { ResponseLogSetting } from "../../../../common/types";
import { ShowToastFn } from "../../types";
import { IConfigurationService, IIpcProxy } from "../interface";

export class IpcProxy implements IIpcProxy {
  //#region Private fields ----------------------------------------------------
  private deleteRequestCounter = 0;
  private getRequestCounter = 0;
  private logLevel: LogLevel;
  private patchRequestCounter = 0;
  private postRequestCounter = 0;
  private putRequestCounter = 0;
  private showToast!: ShowToastFn;
  private unsubscribeSystemConfiguration: (() => void) | null;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this.logLevel = LogLevel.Error;

    this.unsubscribeSystemConfiguration = null;
  }
  //#endregion

  //#region IIpcProxy Members - Service methods -------------------------------
  public initializeSubscriptions(configurationService: IConfigurationService): void {
    if (this.unsubscribeSystemConfiguration == null) {
      this.unsubscribeSystemConfiguration = configurationService.subscribeSystemConfigurationChangeListener(
        (data: SystemConfigurationDto) =>
          this.logLevel = data.responseLoggingConfiguration.find((rls: ResponseLogSetting) => rls.source == "IPC")?.level || LogLevel.Error
      );
    }
  }

  public setShowToast(showToast: ShowToastFn): void {
    this.showToast = showToast;
  }

  //#region IIpcProxy Members - Data methods ----------------------------------
  public deleteData(path: string): Promise<number> {
    const request: IpcRequest<never> = {
      id: ++this.deleteRequestCounter,
      path: path
    };
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: "DELETE", request: request });
    }
    return window.ipc.data<never, number>("DELETE", request)
      .then(
        (response: IpcResponse<number>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("DELETE", path, response);
          } else {
            return this.processIpcResponse("DELETE", path, response);
          }
        },
        (reason: Error) => this.processIpcRejection("DELETE", path, reason)
      );
  }

  public getData<Res extends object | string>(path: string): Promise<Res> {
    const request: IpcRequest<never> = {
      id: ++this.getRequestCounter,
      path: path
    };
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: "GET", request: request });
    }
    return window.ipc.data<never, Res>("GET", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("GET", path, response);
          } else {
            return this.processIpcResponse("GET", path, response);
          }
        },
        (reason: Error) => this.processIpcRejection("GET", path, reason)
      );
  }

  public postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    return this.executePost(path, data);
  }

  public postEmptyBody<Res extends object>(path: string): Promise<Res> {
    return this.executePost(path, null);
  }

  public putData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.putRequestCounter,
      path: path,
      data: data
    };
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: "PUT", request: request });
    }
    return window.ipc.data<Req, Res>("PUT", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("PUT", path, response);
          } else {
            return this.processIpcResponse("PUT", path, response);
          }
        },
        (reason: Error) => this.processIpcRejection("PUT", path, reason)
      );
  }

  public patchData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.patchRequestCounter,
      path: path,
      data: data
    };
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: "PATCH", request: request });
    }
    return window.ipc.data<Req, Res>("PATCH", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("PATCH", path, response);
          } else {
            return this.processIpcResponse("PATCH", path, response);
          }
        },
        (reason: Error) => this.processIpcRejection("PATCH", path, reason)
      );
  }
  //#endregion

  // #region Auxiliary methods ------------------------------------------------
  private executePost<Req extends object, Res extends object>(path: string, data: Req | null): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.postRequestCounter,
      path: path,
      data: data
    };
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ verb: "POST", request: request });
    }
    return window.ipc.data<Req, Res>("POST", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("POST", path, response);
          } else {
            return this.processIpcResponse("POST", path, response);
          }
        },
        (reason: Error) => this.processIpcRejection<Res>("POST", path, reason)
      );
  }

  private processIpcErrorResponse<Dto>(channel: IpcChannel, path: string, response: IpcResponse<Dto>): Promise<never> {
    if (this.logLevel <= 4) {
      // eslint-disable-next-line no-console
      console.error({ channel: channel, path: path, response: response });
    }
    let errorMessage: string | undefined = undefined;
    switch (response.status) {
      case EIpcStatus.BadRequest:
        errorMessage = "Bad formatted request.";
        break;
      case EIpcStatus.Conflict:
        errorMessage = "The data has been changed by another user.";
        break;
      case EIpcStatus.Error:
        errorMessage = "Server error.";
        break;
      case EIpcStatus.Forbidden:
        errorMessage = "This action is forbidden.";
        break;
      case EIpcStatus.Gone:
        errorMessage = "The resource has gone";
        break;
      case EIpcStatus.NotAllowed:
        errorMessage = "This action is not allowed.";
        break;
      case EIpcStatus.NotFound:
        errorMessage = "Resource not found.";
        break;
      case EIpcStatus.NotImplemented:
        errorMessage = "Not implemented";
        break;
      case EIpcStatus.Unauthorized:
        errorMessage = "You are not allowed to perform this action.";
        break;
      case EIpcStatus.Unprocessable:
        errorMessage = "You are not allowed to perform this action.";
        break;
    }

    if (errorMessage) {
      void this.showToast(
        {
          message: `IPC ${channel} ${path}: ${response.status}: ${response.message ?? errorMessage}`,
          intent: "danger",
          isCloseButtonShown: true,
          icon: "warning-sign"
        },
        `${channel}-${this.getRequestCounter}`
      );
    }
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }

  private processIpcResponse<Dto>(channel: IpcChannel, path: string, response: IpcResponse<Dto>): Dto {
    if (this.logLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log({ channel: channel, path: path, response: response });
    }
    return response.data!;
  }

  private processIpcRejection<T>(channel: IpcChannel, path: string, reason: Error): Promise<T> {
    if (this.logLevel <= 4) {
      // eslint-disable-next-line no-console
      console.error({ channel: channel, path: path, response: reason });
    }
    void this.showToast(
      {
        message: `IPC ${channel} ${path}:` + (reason.message ?? "Some error occurred"),
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      `${channel}-${this.getRequestCounter}`
    );
    return Promise.reject<T>(reason);
  }
  //#endregion
}
