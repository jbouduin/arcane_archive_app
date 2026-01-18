import { IIpcProxy } from "./ipc-proxy";

export interface ILogService {
  initialize(ipcProxy: IIpcProxy): void;
  info(message: string, ...args: Array<unknown>): void;
  error(message: string, ...args: Array<unknown>): void;
  warning(message: string, ...args: Array<unknown>): void;
  debug(message: string, ...args: Array<unknown>): void;
  trace(message: string, ...args: Array<unknown>): void;
}
