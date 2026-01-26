import { SystemConfigurationDto } from "../../../../common/dto";
import { LogLevel } from "../../../../common/enums";
import { MainLogSetting, MainLogSource, ResponseLogSetting, ResponseLogSource } from "../../../../common/types";
import { SelectOption, ValidationResult } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";
import { DataConfigurationViewmodel } from "./data-configuration.viewmodel";
import { LogSettingViewmodel, MainLogSettingViewmodel, ResponseLogSettingViewmodel } from "./log-setting.viewmodel";

export class SystemSettingsViewmodel extends BaseViewmodel<SystemConfigurationDto> {
  // #region Private fields ---------------------------------------------------
  private readonly invalidUrlResult: ValidationResult;
  private readonly _mainLogSettingsViewmodels: Map<MainLogSource, MainLogSettingViewmodel>;
  private readonly _responseLogSettingsViewmodels: Map<ResponseLogSource, ResponseLogSettingViewmodel>;
  private readonly _dataConfigurationViewmodel: DataConfigurationViewmodel;
  //#endregion

  // #region Getters/Setters --------------------------------------------------
  public get dataConfigurationViewmodel(): DataConfigurationViewmodel {
    return this._dataConfigurationViewmodel;
  }

  public get restartRequired(): boolean {
    return this._dto.discovery != this._org.discovery || this._dataConfigurationViewmodel.hasChanges;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(dto: SystemConfigurationDto, mode: ViewmodelMode) {
    super(dto, mode);
    this.invalidUrlResult = { helperText: "Please enter a valid internet address", intent: "danger" };
    // --- data configuration view model
    this._dataConfigurationViewmodel = new DataConfigurationViewmodel(dto.dataConfiguration, mode);
    this.registerChildViewmodel(this._dataConfigurationViewmodel);
    // --- log level viewmodels ---
    this._mainLogSettingsViewmodels = new Map<MainLogSource, MainLogSettingViewmodel>();
    this._responseLogSettingsViewmodels = new Map<ResponseLogSource, ResponseLogSettingViewmodel>();
    const options = [
      { value: LogLevel.None, label: "No logging" },
      { value: LogLevel.Error, label: "Error (default)" },
      { value: LogLevel.Warning, label: "Warning" },
      { value: LogLevel.Info, label: "Info" },
      { value: LogLevel.Debug, label: "Debug - pretty verbose" },
      { value: LogLevel.Trace, label: "Trace - silly verbose" },
    ];
    this.registerSelectOptions("rendererLogLevel", options);
    // --- main log settings
    this.registerMainLogSettingsViewmodel(dto, mode, "API", options);
    this.registerMainLogSettingsViewmodel(dto, mode, "DB", options);
    this.registerMainLogSettingsViewmodel(dto, mode, "Main", options);
    this.registerMainLogSettingsViewmodel(dto, mode, "Renderer", options);
    // --- renderer log settings
    this.registerRendererLogSettingsViewmodel(dto, mode, "IPC", options);
    this.registerRendererLogSettingsViewmodel(dto, mode, "authentication", options);
    this.registerRendererLogSettingsViewmodel(dto, mode, "collection", options);
    this.registerRendererLogSettingsViewmodel(dto, mode, "deck", options);
    this.registerRendererLogSettingsViewmodel(dto, mode, "library", options);
    // --- validations ---
    this.registerValidation("discovery", () => this.validateDiscovery());
  }

  private registerMainLogSettingsViewmodel(
    dto: SystemConfigurationDto,
    mode: ViewmodelMode,
    source: MainLogSource,
    options: Array<SelectOption<LogLevel>>
  ): void {
    const viewmodel = new LogSettingViewmodel(
      dto.mainLoggingConfiguration.find((l: MainLogSetting) => l.source == source)!, mode, options);
    this._mainLogSettingsViewmodels.set(source, viewmodel);
    this.registerChildViewmodel(viewmodel);
  }

  private registerRendererLogSettingsViewmodel(
    dto: SystemConfigurationDto,
    mode: ViewmodelMode,
    source: ResponseLogSource,
    options: Array<SelectOption<LogLevel>>
  ): void {
    const viewmodel = new LogSettingViewmodel(
      dto.responseLoggingConfiguration.find((l: ResponseLogSetting) => l.source == source)!, mode, options);
    this._responseLogSettingsViewmodels.set(source, viewmodel);
    this.registerChildViewmodel(viewmodel);
  }
  //#endregion

  // #region Public methods ---------------------------------------------------
  public setFactoryDefaults(dto: SystemConfigurationDto): void {
    Object.assign(this.dto, dto);
    Object.assign(this._dataConfigurationViewmodel.dto, dto.dataConfiguration);
    this._mainLogSettingsViewmodels
      .forEach((lsvm: MainLogSettingViewmodel, source: MainLogSource) => {
        lsvm.dto.level = dto.mainLoggingConfiguration.find((l: MainLogSetting) => l.source == source)!.level;
      });
    this._responseLogSettingsViewmodels
      .forEach((lsvm: ResponseLogSettingViewmodel, source: ResponseLogSource) => {
        lsvm.dto.level = dto.responseLoggingConfiguration.find((l: ResponseLogSetting) => l.source == source)!.level;
      });
  }

  public getMainLogSettingsViewmodel(source: MainLogSource): MainLogSettingViewmodel {
    return this._mainLogSettingsViewmodels.get(source)!;
  }

  public getResponseLogSettingsViewmodel(source: ResponseLogSource): ResponseLogSettingViewmodel {
    return this._responseLogSettingsViewmodels.get(source)!;
  }
  //#endregion

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
  //#endregion
}
