import { isEqual } from "lodash";
import { SystemSettingsDto } from "../../../../common/dto";
import { LogLevel } from "../../../../common/enums";
import { LogSetting } from "../../../../common/types";
import { stringNotNullOrEmpty } from "../../components/util";
import { SelectOption, ValidationResult } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class SystemSettingsViewmodel extends BaseViewmodel<SystemSettingsDto> {
  // #region Private fields ---------------------------------------------------
  private readonly invalidUrlResult: ValidationResult;
  private readonly _firstTime: boolean;
  private readonly _logLevelOptions: Array<SelectOption<LogLevel>>;
  // #endregion

  // #region Getters/Setters apiConfiguration ---------------------------------
  public get discovery(): string {
    return this._dto.discovery;
  }

  public set discovery(value: string) {
    this._dto.discovery = value;
  }
  // #endregion

  // #region Getters/Setters dataConfiguration --------------------------------
  public get rootDataDirectory(): string {
    return this._dto.dataConfiguration.rootDataDirectory;
  }

  public set rootDataDirectory(value: string) {
    this._dto.dataConfiguration.rootDataDirectory = value;
  }

  public get cacheDirectory(): string {
    return this._dto.dataConfiguration.cacheDirectory;
  }

  public set cacheDirectory(value: string) {
    this._dto.dataConfiguration.cacheDirectory = value;
  }

  public get databaseName(): string {
    return this._dto.dataConfiguration.databaseName;
  }

  public set databaseName(value: string) {
    this._dto.dataConfiguration.databaseName = value;
  }

  public get logDirectory(): string {
    return this._dto.dataConfiguration.logDirectory;
  }

  public set logDirectory(value: string) {
    this._dto.dataConfiguration.logDirectory = value;
  }
  // #endregion

  // #region Getters/Setters logging ------------------------------------------
  public get logLevelOptions(): Array<SelectOption<LogLevel>> {
    return this._logLevelOptions;
  }

  public get rendererLogLevel(): LogLevel {
    return this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "Renderer")!.level;
  }

  public set rendererLogLevel(value: LogLevel) {
    this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "Renderer")!.level = value;
  }

  public get mainLogLevel(): LogLevel {
    return this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "Main")!.level;
  }

  public set mainLogLevel(value: LogLevel) {
    this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "Main")!.level = value;
  }

  public get apiLogLevel(): LogLevel {
    return this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "API")!.level;
  }

  public set apiLogLevel(value: LogLevel) {
    this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "API")!.level = value;
  }

  public get databaseLogLevel(): LogLevel {
    return this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "DB")!.level;
  }

  public set databaseLogLevel(value: LogLevel) {
    this._dto.loggingConfiguration.find((l: LogSetting) => l.source == "DB")!.level = value;
  }
  // #endregion

  // #region Getter -----------------------------------------------------------
  public get restartRequired(): boolean {
    return this._dto.discovery != this._org.discovery ||
      !isEqual(this._dto.dataConfiguration, this._org.dataConfiguration);
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get firstTime(): boolean {
    return this._firstTime;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: SystemSettingsDto, firstTime: boolean) {
    super(dto);
    this.invalidUrlResult = { helperText: "Please enter a valid internet address", intent: "danger" };
    this._firstTime = firstTime;
    this._logLevelOptions = [
      { value: LogLevel.None, label: "No logging" },
      { value: LogLevel.Error, label: "Error (default)" },
      { value: LogLevel.Warning, label: "Warning" },
      { value: LogLevel.Info, label: "Info" },
      { value: LogLevel.Debug, label: "Debug - pretty verbose" },
      { value: LogLevel.Trace, label: "Trace - silly verbose" },
    ];
  }
  // #endregion

  // #region Validations ------------------------------------------------------
  public validateRootDataDirectory(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.rootDataDirectory)) {
      this.setFieldValid("rootDataDirectory");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("rootDataDirectory");
      result = { helperText: "You must specify a directory", intent: "danger" };
    }
    return result;
  }

  public validateCacheDataDirectory(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.cacheDirectory)) {
      this.setFieldValid("cacheDirectory");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("cacheDirectory");
      result = { helperText: "You must specify a directory", intent: "danger" };
    }
    return result;
  }

  public validateLogDirectory(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.logDirectory)) {
      this.setFieldValid("logDirectory");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("logDirectory");
      result = { helperText: "You must specify a directory", intent: "danger" };
    }
    return result;
  }

  public validateDatabaseName(): ValidationResult {
    let result: ValidationResult;
    if (stringNotNullOrEmpty(this._dto.dataConfiguration.databaseName)) {
      this.setFieldValid("databaseName");
      result = this.validValidation;
    } else {
      this.setFieldInvalid("databaseName");
      result = { helperText: "You must specify a database name", intent: "danger" };
    }
    return result;
  }

  public validateDiscovery(): ValidationResult {
    let result: ValidationResult;
    try {
      const url = new URL(this._dto.discovery);
      if (url.protocol == "http:" || url.protocol == "https:") {
        this.setFieldValid("discovery");
        result = this.validValidation;
      } else {
        this.setFieldInvalid("discovery");
        result = this.invalidUrlResult;
      }
    } catch {
      this.setFieldInvalid("discovery");
      result = this.invalidUrlResult;
    }

    return result;
  }
  // #endregion
}
