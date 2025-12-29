/* eslint-disable no-console */
import { singleton } from "tsyringe";
import { LogSource } from "../../base";
import { ILogService } from "../interface/log.service";

@singleton()
export class LogService implements ILogService {
  // TODO add logging level to preferences
  // TODO create a log router to log from renderer over IPC + create a log service in renderer or add logging to ipcproxy directly
  // #region ILogService methods ----------------------------------------------
  public info(source: LogSource, message: string, ...args: Array<unknown>): void {
    console.log(`[${source}] `.concat(new Date().toISOString(), "  INFO - ", message), ...args);
  }

  public error(source: LogSource, message: string, ...args: Array<unknown>): void {
    console.error(`\x1b[35m[${source}] `.concat(new Date().toISOString(), " \x1b[0mERROR - ", message), ...args);
  }

  public warning(source: LogSource, message: string, ...args: Array<unknown>): void {
    console.warn(`\x1b[33m[${source}] `.concat(new Date().toISOString(), " \x1b[0m WARN - ", message), ...args);
  }

  public debug(source: LogSource, message: string, ...args: Array<unknown>): void {
    console.debug(`[${source}] `.concat(new Date().toISOString(), " DEBUG - ", message), ...args);
  }

  public trace(source: LogSource, message: string, ...args: Array<unknown>): void {
    console.debug(`[${source}] `.concat(new Date().toISOString(), " TRACE - ", message), ...args);
  }
  // #endregion
}
