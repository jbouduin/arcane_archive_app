import { ToastProps } from "@blueprintjs/core";
import { EIpcStatus, IpcChannel, IpcRequest, IpcResponse } from "../../../../common/ipc";
import { IIpcProxyService } from "../interface";

export class IpcProxyService implements IIpcProxyService {
  // #region private fields ---------------------------------------------------
  private showToast!: (props: ToastProps, key?: string) => void;
  private deleteRequestCounter = 0;
  private getRequestCounter = 0;
  private patchRequestCounter = 0;
  private postRequestCounter = 0;
  private putRequestCounter = 0;
  // #endregion

  // #region Public fields ----------------------------------------------------
  public logServerResponses: boolean;
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor() {
    this.logServerResponses = false;
  }
  // #endregion

  public initialize(showToast: (props: ToastProps, key?: string) => void): void {
    this.showToast = showToast;
  }

  // #region IPC-proxy methods ------------------------------------------------
  public deleteData(path: string): Promise<number> {
    const request: IpcRequest<never> = {
      id: ++this.deleteRequestCounter,
      path: path
    };

    return window.ipc.data<never, number>("DELETE", request)
      .then(
        (response: IpcResponse<number>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("DELETE", response);
          } else {
            return this.processIpcResponse(response);
          }
        },
        (reason: Error) => this.processIpcRejection("DELETE", reason)
      );
  }

  public getData<Res extends object | string>(path: string): Promise<Res> {
    const request: IpcRequest<never> = {
      id: ++this.getRequestCounter,
      path: path
    };
    return window.ipc.data<never, Res>("GET", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("GET", response);
          } else {
            return this.processIpcResponse(response);
          }
        },
        (reason: Error) => this.processIpcRejection("GET", reason)
      );
  }

  public postEmptyBody<Res extends object>(path: string): Promise<Res> {
    return this.executePost(path, null);
  }

  public postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    return this.executePost(path, data);
  }

  public putData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.putRequestCounter,
      path: path,
      data: data
    };
    return window.ipc.data<Req, Res>("PUT", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("PUT", response);
          } else {
            return this.processIpcResponse(response);
          }
        },
        (reason: Error) => this.processIpcRejection("PUT", reason)
      );
  }

  public patchData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.patchRequestCounter,
      path: path,
      data: data
    };
    return window.ipc.data<Req, Res>("PATCH", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("PATCH", response);
          } else {
            return this.processIpcResponse(response);
          }
        },
        (reason: Error) => this.processIpcRejection("PATCH", reason)
      );
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  private executePost<Req extends object, Res extends object>(path: string, data: Req | null): Promise<Res> {
    const request: IpcRequest<Req> = {
      id: ++this.postRequestCounter,
      path: path,
      data: data
    };
    return window.ipc.data<Req, Res>("POST", request)
      .then(
        (response: IpcResponse<Res>) => {
          if (response.status >= EIpcStatus.BadRequest) {
            return this.processIpcErrorResponse("POST", response);
          } else {
            return this.processIpcResponse(response);
          }
        },
        (reason: Error) => this.processIpcRejection<Res>("POST", reason)
      );
  }

  private processIpcErrorResponse<Dto>(channel: IpcChannel, response: IpcResponse<Dto>): Promise<never> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(response);
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
          message: `${response.status}: ${response.message ?? errorMessage}`,
          intent: "danger",
          isCloseButtonShown: true,
          icon: "warning-sign"
        },
        `${channel}-${this.getRequestCounter}`
      );
    }
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }

  private processIpcResponse<Dto>(response: IpcResponse<Dto>): Dto {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(response);
    }
    return response.data!;
  }

  private processIpcRejection<T>(channel: IpcChannel, reason: Error): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(reason);
    }
    void this.showToast(
      {
        message: reason.message ?? "Some error occurred",
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      `${channel}-${this.getRequestCounter}`
    );
    return Promise.reject<T>(reason);
  }
  // #endregion
}
