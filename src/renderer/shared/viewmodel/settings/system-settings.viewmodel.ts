import { SystemSettingsDto } from "../../../../common/dto";
import { LogLevel } from "../../../../common/enums";
import { LogSetting, LogSource } from "../../../../common/types";
import { SelectOption, ValidationResult } from "../../types";
import { viewmodelMode } from "../base.viewmodel";
import { BaseViewmodelNew } from "../base.viewmodel-new";
import { DataConfigurationViewmodel } from "./data-configuration.viewmodel";
import { LogSettingViewmodel } from "./log-setting.viewmodel";

export class SystemSettingsViewmodel extends BaseViewmodelNew<SystemSettingsDto> {
  // #region Private fields ---------------------------------------------------
  private readonly invalidUrlResult: ValidationResult;
  private readonly _logSettingsViewmodels: Map<LogSource, LogSettingViewmodel>;
  private readonly _dataConfigurationViewmodel: DataConfigurationViewmodel;
  // #endregion

  //#region Getters/Setters --------------------------------------------------
  public get dataConfigurationViewmodel(): DataConfigurationViewmodel {
    return this._dataConfigurationViewmodel;
  }

  public get restartRequired(): boolean {
    return this._dto.discovery != this._org.discovery || this._dataConfigurationViewmodel.hasChanges;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: SystemSettingsDto, mode: viewmodelMode) {
    super(dto, mode);
    this.invalidUrlResult = { helperText: "Please enter a valid internet address", intent: "danger" };
    // --- data configuration view model
    this._dataConfigurationViewmodel = new DataConfigurationViewmodel(dto.dataConfiguration, mode);
    this.registerChildViewmodel(this._dataConfigurationViewmodel);
    // --- log level viewmodels ---
    this._logSettingsViewmodels = new Map<LogSource, LogSettingViewmodel>();
    const options = [
      { value: LogLevel.None, label: "No logging" },
      { value: LogLevel.Error, label: "Error (default)" },
      { value: LogLevel.Warning, label: "Warning" },
      { value: LogLevel.Info, label: "Info" },
      { value: LogLevel.Debug, label: "Debug - pretty verbose" },
      { value: LogLevel.Trace, label: "Trace - silly verbose" },
    ];
    this.registerLogSettingsViewmodel(dto, mode, "API", options);
    this.registerLogSettingsViewmodel(dto, mode, "DB", options);
    this.registerLogSettingsViewmodel(dto, mode, "Main", options);
    this.registerLogSettingsViewmodel(dto, mode, "Renderer", options);
    // --- validations ---
    this.registerValidation("discovery", () => this.validateDiscovery());
  }

  private registerLogSettingsViewmodel(dto: SystemSettingsDto, mode: viewmodelMode, source: LogSource, options: Array<SelectOption<LogLevel>>): void {
    const viewmodel = new LogSettingViewmodel(
      dto.loggingConfiguration.find((l: LogSetting) => l.source == source)!, mode, options);
    this._logSettingsViewmodels.set(source, viewmodel);
    this.registerChildViewmodel(viewmodel);
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public setFactoryDefaults(dto: SystemSettingsDto): void {
    Object.assign(this.dto, dto);
    Object.assign(this._dataConfigurationViewmodel.dto, dto.dataConfiguration);
    this._logSettingsViewmodels.forEach((lsvm: LogSettingViewmodel, source: LogSource) => {
      lsvm.dto.level = dto.loggingConfiguration.find((l: LogSetting) => l.source == source)!.level;
    });
  }

  public getLogSettingsViewmodel(source: LogSource): LogSettingViewmodel {
    return this._logSettingsViewmodels.get(source)!;
  }
  // #endregion

  // #region Validations ------------------------------------------------------
  private validateDiscovery(): void {
    // LATER make async and call discovery
    try {
      const url = new URL(this._dto.discovery);
      if (url.protocol == "http:" || url.protocol == "https:") {
        this.setFieldValid("discovery");
      } else {
        this.setFieldInvalid("discovery", this.invalidUrlResult);
      }
    } catch {
      this.setFieldInvalid("discovery", this.invalidUrlResult);
    }
  }
  // #endregion
}
