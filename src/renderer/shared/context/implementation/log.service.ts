import { LogRequestDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { IIpcProxyService } from "../interface";
import { ILogService } from "../interface/log.service";

export class LogService implements ILogService {
  // #region Private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  // #endregion

  // #region ILogService Members ----------------------------------------------
  public initialize(ipcProxy: IIpcProxyService): void {
    this.ipcProxy = ipcProxy;
  }

  public info(message: string, ...args: Array<unknown>): void {
    void this.ipcProxy.postData<LogRequestDto, never>(IpcPaths.LOG_INFO, { message: message, args: args });
  }

  public error(message: string, ...args: Array<unknown>): void {
    void this.ipcProxy.postData<LogRequestDto, never>(IpcPaths.LOG_ERROR, { message: message, args: args });
  }

  public warning(message: string, ...args: Array<unknown>): void {
    void this.ipcProxy.postData<LogRequestDto, never>(IpcPaths.LOG_WARNING, { message: message, args: args });
  }

  public debug(message: string, ...args: Array<unknown>): void {
    void this.ipcProxy.postData<LogRequestDto, never>(IpcPaths.LOG_DEGUG, { message: message, args: args });
  }

  public trace(message: string, ...args: Array<unknown>): void {
    void this.ipcProxy.postData<LogRequestDto, never>(IpcPaths.LOG_TRACE, { message: message, args: args });
  }
  // #endregion
}
