import { LogSetting, LogSource } from "../../../../common/types";

export interface ILogService {
  setLogSettings(logSettings: Array<LogSetting>): void;
  info(source: LogSource, message: string, ...args: Array<unknown>): void;
  error(source: LogSource, message: string, ...args: Array<unknown>): void;
  warning(source: LogSource, message: string, ...args: Array<unknown>): void;
  debug(source: LogSource, message: string, ...args: Array<unknown>): void;
  trace(source: LogSource, message: string, ...args: Array<unknown>): void;
}
