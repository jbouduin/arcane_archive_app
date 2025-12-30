import { singleton } from "tsyringe";
import { LogLevel } from "../../../../common/enums";
import { LogSetting, LogSource } from "../../../../common/types";
import { ILogService } from "../interface/log.service";

@singleton()
export class LogService implements ILogService {
  // #region Private fields ---------------------------------------------------
  private logSettings: Map<LogSource, LogLevel>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.logSettings = new Map<LogSource, LogLevel>();
  }
  // #endregion

  // #region ILogService methods ----------------------------------------------
  public setLogSettings(logSettings: Array<LogSetting>): void {
    this.logSettings.clear();
    logSettings.forEach((setting: LogSetting) => this.logSettings.set(setting.source, setting.level));
  }

  public info(source: LogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Info)) {
      // eslint-disable-next-line no-console
      console.log(`[${source}] `.concat(new Date().toISOString(), "  INFO - ", message), ...args);
    }
  }

  public error(source: LogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Error)) {
      // eslint-disable-next-line no-console
      console.error(`\x1b[35m[${source}] `.concat(new Date().toISOString(), " \x1b[0mERROR - ", message), ...args);
    }
  }

  public warning(source: LogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Warning)) {
      // eslint-disable-next-line no-console
      console.warn(`\x1b[33m[${source}] `.concat(new Date().toISOString(), " \x1b[0m WARN - ", message), ...args);
    }
  }

  public debug(source: LogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Debug)) {
      // eslint-disable-next-line no-console
      console.debug(`[${source}] `.concat(new Date().toISOString(), " DEBUG - ", message), ...args);
    }
  }

  public trace(source: LogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Trace)) {
      // eslint-disable-next-line no-console
      console.debug(`[${source}] `.concat(new Date().toISOString(), " TRACE - ", message), ...args);
    }
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private shouldLog(source: LogSource, level: LogLevel) {
    return (this.logSettings.get(source) ?? LogLevel.Info) <= level;
  }
  // #endregion
}
