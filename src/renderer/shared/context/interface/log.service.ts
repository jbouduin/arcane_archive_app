import { IIpcProxyService } from "./ipc-proxy.service";

export interface ILogService {
  initialize(ipcProxy: IIpcProxyService): void;
  info(message: string, ...args: Array<unknown>): void;
  error(message: string, ...args: Array<unknown>): void;
  warning(message: string, ...args: Array<unknown>): void;
  debug(message: string, ...args: Array<unknown>): void;
  trace(message: string, ...args: Array<unknown>): void;
}
