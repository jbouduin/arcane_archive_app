import { join } from "path";
import { inject, singleton } from "tsyringe";
import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { ScryfallImageSize } from "../../../../common/types";
import { DiscoveryDto } from "../../../dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, IIoService, ILogService, IResultFactory } from "../interface";

@singleton()
export class ConfigurationService extends BaseService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private readonly ioService: IIoService;
  private _systemSettings!: SystemSettingsDto;
  private _apiConfiguration: ApiConfigurationDto | null;
  private _preferences!: PreferencesDto;
  private _isFirstUsage!: boolean;
  private discover!: (() => Promise<ResultDto<DiscoveryDto>>) | null;
  // #endregion

  // #region IConfigurationService properties ---------------------------------
  public get apiConfiguration(): ApiConfigurationDto | null {
    return this._apiConfiguration;
  }

  public set apiConfiguration(value: ApiConfigurationDto | null) {
    this._apiConfiguration = value;
  }

  public get configuration(): SystemSettingsDto {
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
  // #endregion

  // #region Constructor & C° -------------------------------------------------
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
  // #endregion

  // #region IConfigurationService methods ------------------------------------
  public initialize(useDarkTheme: boolean): void {
    const systemSettings = this.ioService.readSystemSettings<SystemSettingsDto>();
    // --- system settings ---
    if (systemSettings == null) {
      this._systemSettings = this.createConfigurationFactoryDefault();
      this._isFirstUsage = true;
    } else {
      this._systemSettings = systemSettings;
      this._isFirstUsage = false;
    }
    this.logService.debug("Main", "First time usage", this.isFirstUsage);
    // --- preferences ---
    const preferences = this.ioService.readPreferences<PreferencesDto>();
    if (preferences == null) {
      this._preferences = this.createPreferencesFactoryDefault(useDarkTheme);
    } else {
      this._preferences = preferences;
    }
  }

  public async runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void> {
    this.discover = discover;
    void await discover()
      .then(
        (res: ResultDto<DiscoveryDto>) => this._apiConfiguration = res.data,
        () => this._apiConfiguration = null
      );
  }
  // #endregion

  // #region Route callbacks --------------------------------------------------
  public getSystemSettings(): Promise<IResult<SystemSettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this._systemSettings);
  }

  public getSystemSettingsFactoryDefault(): Promise<IResult<SystemSettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this.createConfigurationFactoryDefault());
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
      preferences: this._preferences
    };
    return this.resultFactory.createSuccessResultPromise(result);
  }

  public saveSystemSettings(configuration: SystemSettingsDto): Promise<IResult<SystemSettingsDto>> {
    this.ioService.saveSystemSettings(configuration);
    this._systemSettings = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<SystemSettingsDto>(configuration);
  }

  public savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>> {
    this.ioService.savePreferences(preferences);
    this._preferences = preferences;
    return this.resultFactory.createSuccessResultPromise<PreferencesDto>(this._preferences);
  }
  // #endregion

  // #region Auxiliary factory default methods --------------------------------
  private createConfigurationFactoryDefault(): SystemSettingsDto {
    const result: SystemSettingsDto = {
      discovery: "http://localhost:5402/api/public/discover",
      dataConfiguration: {
        rootDataDirectory: this.ioService.defaultDataDirectory,
        cacheDirectory: this.ioService.defaultCacheDirectory,
        logDirectory: this.ioService.defaultLogDirectory,
        databaseName: "arcane_archive.sqlite"
      }
    };
    return result;
  }

  private createPreferencesFactoryDefault(useDarkTheme: boolean): PreferencesDto {
    const result: PreferencesDto = {
      refreshCacheAtStartup: false,
      cachedImageSize: ScryfallImageSize.NORMAL,
      useDarkTheme: useDarkTheme,
      logServerResponses: false,
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
  // #endregion

  // #region Auxiliary validation related methods -----------------------------
  // #endregion
}
