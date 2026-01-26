import { join } from "path";
import { inject, singleton } from "tsyringe";
import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemConfigurationDto } from "../../../../common/dto";
import { LogLevel, ScryfallImageSize } from "../../../../common/enums";
import { DiscoveryDto } from "../../../dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../interface";
import { mergeWithChangeDetails } from "../../../../common/util";

@singleton()
export class ConfigurationService extends BaseService implements IConfigurationService {
  //#region private fields ----------------------------------------------------
  private readonly ioService: IIoService;
  private _systemSettings!: SystemConfigurationDto;
  private _apiConfiguration: ApiConfigurationDto | null;
  private _preferences!: PreferencesDto;
  private _isFirstUsage!: boolean;
  private discover!: (() => Promise<ResultDto<DiscoveryDto>>) | null;
  //#endregion

  //#region IConfigurationService properties ----------------------------------
  public get apiConfiguration(): ApiConfigurationDto | null {
    return this._apiConfiguration;
  }

  public set apiConfiguration(value: ApiConfigurationDto | null) {
    this._apiConfiguration = value;
  }

  public get systemConfiguration(): SystemConfigurationDto {
    return this._systemSettings;
  }

  public get preferences(): PreferencesDto {
    return this._preferences;
  }

  public get isFirstUsage(): boolean {
    return this._isFirstUsage;
  }

  public get cacheDatabaseFilePath(): string {
    return join(this._systemSettings.dataConfiguration.cacheDirectory, "index.sqlite");
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory,
    @inject(INFRASTRUCTURE.IoService) ioService: IIoService,
  ) {
    super(logService, resultFactory);
    this.ioService = ioService;
    this._apiConfiguration = null;
    this.discover = null;
  }
  //#endregion

  //#region IConfigurationService members -------------------------------------
  public initialize(useDarkTheme: boolean): void {
    const systemSettings = this.ioService.readSystemSettings<SystemConfigurationDto>();
    // --- system settings ---
    if (systemSettings == null) {
      this._systemSettings = this.createSystemSettingsFactoryDefault();
      this._isFirstUsage = true;
    } else {
      const mergeResult = mergeWithChangeDetails(this.createSystemSettingsFactoryDefault(), systemSettings);
      if (mergeResult.changed) {
        void this.ioService.saveSystemSettings(mergeResult.merged);
      }
      this._systemSettings = mergeResult.merged;
      this._isFirstUsage = false;
    }
    this.logService.setLogSettings(this._systemSettings.mainLoggingConfiguration);
    this.logService.trace("Main", "Loaded system settings:", this._systemSettings);
    this.logService.trace("Main", "First time usage:", this.isFirstUsage);
    // --- preferences ---
    const preferences = this.ioService.readPreferences<PreferencesDto>();
    if (preferences == null) {
      this._preferences = this.createPreferencesFactoryDefault(useDarkTheme);
    } else {
      const mergeResult = mergeWithChangeDetails(this.createPreferencesFactoryDefault(useDarkTheme), preferences);
      if (mergeResult.changed) {
        this.ioService.savePreferences(preferences);
      }
      this._preferences = mergeResult.merged;
    }
    this.logService.trace("Main", "Loaded preferences:", this._preferences);
  }

  public async runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void> {
    this.discover = discover;
    void await discover()
      .then(
        (res: ResultDto<DiscoveryDto>) => this._apiConfiguration = res.data,
        () => this._apiConfiguration = null
      );
  }

  public getSystemSettings(): Promise<IResult<SystemConfigurationDto>> {
    return this.resultFactory.createSuccessResultPromise(this._systemSettings);
  }

  public getSystemSettingsFactoryDefault(): Promise<IResult<SystemConfigurationDto>> {
    return this.resultFactory.createSuccessResultPromise(this.createSystemSettingsFactoryDefault());
  }

  public async getSettings(): Promise<IResult<SettingsDto>> {
    if (this._apiConfiguration == null) {
      await this.discover!()
        .then(
          (res: ResultDto<DiscoveryDto>) => this._apiConfiguration = res.data,
          () => this._apiConfiguration = null
        );
    }
    const result: SettingsDto = {
      apiConfiguration: this._apiConfiguration,
      preferences: this._preferences,
      systemConfiguration: this._systemSettings
    };
    return this.resultFactory.createSuccessResultPromise(result);
  }

  public saveSystemSettings(systemSettings: SystemConfigurationDto): Promise<IResult<SystemConfigurationDto>> {
    this.ioService.saveSystemSettings(systemSettings);
    this._systemSettings = systemSettings;
    this._isFirstUsage = false;
    this.logService.setLogSettings(systemSettings.mainLoggingConfiguration);
    return this.resultFactory.createSuccessResultPromise<SystemConfigurationDto>(systemSettings);
  }

  public savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>> {
    this.ioService.savePreferences(preferences);
    this._preferences = preferences;
    return this.resultFactory.createSuccessResultPromise<PreferencesDto>(this._preferences);
  }
  //#endregion

  //#region Auxiliary methods - factory defaults ------------------------------
  private createSystemSettingsFactoryDefault(): SystemConfigurationDto {
    const result: SystemConfigurationDto = {
      discovery: "http://localhost:5402/api/public/discover",
      dataConfiguration: {
        rootDataDirectory: this.ioService.defaultDataDirectory,
        cacheDirectory: this.ioService.defaultCacheDirectory,
        logDirectory: this.ioService.defaultLogDirectory,
        databaseName: "arcane_archive.sqlite"
      },
      mainLoggingConfiguration: [
        { source: "API", level: LogLevel.Error },
        { source: "DB", level: LogLevel.Error },
        { source: "Main", level: LogLevel.Error },
        { source: "Renderer", level: LogLevel.Error }
      ],
      rendererLogLevel: LogLevel.Error,
      responseLoggingConfiguration: [
        { source: "IPC", level: LogLevel.Error },
        { source: "authentication", level: LogLevel.Error },
        { source: "collection", level: LogLevel.Error },
        { source: "deck", level: LogLevel.Error },
        { source: "library", level: LogLevel.Error }
      ]
    };
    return result;
  }

  private createPreferencesFactoryDefault(useDarkTheme: boolean): PreferencesDto {
    const result: PreferencesDto = {
      refreshCacheAtStartup: false,
      cachedImageSize: ScryfallImageSize.NORMAL,
      useDarkTheme: useDarkTheme,
      defaultCardSortField: "collectorNumberSortValue",
      defaultCardSortDirection: "ASC",
      defaultPageSize: 50,
      librarySetTreeSettings: {
        cardSetSort: "releaseDateDescending",
        cardSetGroupBy: "parent",
        cardSetTypeFilter: [
          "CORE",
          "EXPANSION",
          "TOKEN",
          "STARTER",
          "DUEL_DECK",
          "PROMO"
        ]
      }
    };
    return result;
  }
  //#endregion
}
