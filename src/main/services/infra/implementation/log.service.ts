import { singleton } from "tsyringe";
import { LogLevel } from "../../../../common/enums";
import { MainLogSetting, MainLogSource } from "../../../../common/types";
import { ILogService } from "../interface/log.service";

@singleton()
export class LogService implements ILogService {
  // #region Private fields ---------------------------------------------------
  private logSettings: Map<MainLogSource, LogLevel>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.logSettings = new Map<MainLogSource, LogLevel>();
  }
  // #endregion

  // #region ILogService methods ----------------------------------------------
  public setLogSettings(logSettings: Array<MainLogSetting>): void {
    this.logSettings.clear();
    logSettings.forEach((setting: MainLogSetting) => this.logSettings.set(setting.source, setting.level));
  }

  public info(source: MainLogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Info)) {
      // eslint-disable-next-line no-console
      console.log(`[${source}] `.concat(new Date().toISOString(), "  INFO - ", message), ...args);
    }
  }

  public error(source: MainLogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Error)) {
      // eslint-disable-next-line no-console
      console.error(`\x1b[35m[${source}] `.concat(new Date().toISOString(), " \x1b[0mERROR - ", message), ...args);
    }
  }

  public warning(source: MainLogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Warning)) {
      // eslint-disable-next-line no-console
      console.warn(`\x1b[33m[${source}] `.concat(new Date().toISOString(), " \x1b[0m WARN - ", message), ...args);
    }
  }

  public debug(source: MainLogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Debug)) {
      // eslint-disable-next-line no-console
      console.debug(`[${source}] `.concat(new Date().toISOString(), " DEBUG - ", message), ...args);
    }
  }

  public trace(source: MainLogSource, message: string, ...args: Array<unknown>): void {
    if (this.shouldLog(source, LogLevel.Trace)) {
      // eslint-disable-next-line no-console
      console.debug(`[${source}] `.concat(new Date().toISOString(), " TRACE - ", message), ...args);
    }
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  private shouldLog(source: MainLogSource, level: LogLevel): boolean {
    return (this.logSettings.get(source) ?? LogLevel.Info) <= level;
  }
  // #endregion
}
