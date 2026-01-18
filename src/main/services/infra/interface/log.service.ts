import { MainLogSetting, MainLogSource } from "../../../../common/types";

export interface ILogService {
  setLogSettings(logSettings: Array<MainLogSetting>): void;
  info(source: MainLogSource, message: string, ...args: Array<unknown>): void;
  error(source: MainLogSource, message: string, ...args: Array<unknown>): void;
  warning(source: MainLogSource, message: string, ...args: Array<unknown>): void;
  debug(source: MainLogSource, message: string, ...args: Array<unknown>): void;
  trace(source: MainLogSource, message: string, ...args: Array<unknown>): void;
}
