import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { inject, singleton } from "tsyringe";
import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { DiscoveryDto } from "../../../dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, ILogService, IResultFactory } from "../interface";

@singleton()
export class ConfigurationService extends BaseService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private configFilePath!: string;
  private preferencesFilePath!: string;
  private appDirectory!: string;
  private homeDirectory!: string;
  private useDarkTheme!: boolean;
  private _configuration!: SystemSettingsDto;
  private _apiConfiguration!: ApiConfigurationDto;
  private _preferences!: PreferencesDto;
  private _isFirstUsage!: boolean;
  // #endregion

  // #region IConfigurationService properties ---------------------------------
  public get apiConfiguration(): ApiConfigurationDto {
    return this._apiConfiguration;
  }

  public set apiConfiguration(value: ApiConfigurationDto) {
    this._apiConfiguration = value;
  }

  public get configuration(): SystemSettingsDto {
    return this._configuration;
  }

  public get preferences(): PreferencesDto {
    return this._preferences;
  }

  public get isFirstUsage(): boolean {
    return this._isFirstUsage;
  }

  public get dataBaseFilePath(): string {
    return join(
      this._configuration.dataConfiguration.rootDataDirectory,
      this._configuration.dataConfiguration.databaseName
    );
  }
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
  }
  // #endregion

  // #region IConfigurationService methods ------------------------------------
  public initialize(appDirectory: string, homeDirectory: string, useDarkTheme: boolean): void {
    this.appDirectory = appDirectory;
    this.homeDirectory = homeDirectory;
    this.useDarkTheme = useDarkTheme;
    this.configFilePath = join(appDirectory, "collection-manager.config.json");
    if (existsSync(this.configFilePath)) {
      this._configuration = JSON.parse(readFileSync(this.configFilePath, "utf-8")) as SystemSettingsDto;
      this._isFirstUsage = false;
    } else {
      this._configuration = this.createConfigurationFactoryDefault();
      this._isFirstUsage = true;
    }
    this.preferencesFilePath = join(appDirectory, "collection-manager.preferences.json");
    if (existsSync(this.preferencesFilePath)) {
      this._preferences = JSON.parse(readFileSync(this.preferencesFilePath, "utf-8")) as PreferencesDto;
    } else {
      this._preferences = this.createPreferencesFactoryDefault(this.useDarkTheme);
    }
  }

  public async runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void> {
    const discoveryDto = await discover();
    this._apiConfiguration = discoveryDto.data;
  }
  // #endregion

  // #region Route callbacks --------------------------------------------------
  public getSystemSettings(): Promise<IResult<SystemSettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this._configuration);
  }

  public getSystemSettingsFactoryDefault(): Promise<IResult<SystemSettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this.createConfigurationFactoryDefault());
  }

  public getSettings(): Promise<IResult<SettingsDto>> {
    const result: SettingsDto = {
      apiConfiguration: this._apiConfiguration,
      preferences: this._preferences
    };
    return this.resultFactory.createSuccessResultPromise(result);
  }

  public saveSystemSettings(configuration: SystemSettingsDto): Promise<IResult<SystemSettingsDto>> {
    this.createDirectoryIfNotExists(dirname(this.configFilePath));
    writeFileSync(this.configFilePath, JSON.stringify(configuration, null, 2));
    this._configuration = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<SystemSettingsDto>(configuration);
  }

  public savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>> {
    this.createDirectoryIfNotExists(dirname(this.preferencesFilePath));
    writeFileSync(this.preferencesFilePath, JSON.stringify(this._configuration, null, 2));
    this._preferences = preferences;
    return this.resultFactory.createSuccessResultPromise<PreferencesDto>(this._preferences);
  }
  // #endregion

  // #region Auxiliary factory default methods --------------------------------
  private createConfigurationFactoryDefault(): SystemSettingsDto {
    const result: SystemSettingsDto = {
      discovery: "http://localhost:5402/api/public/discover",
      dataConfiguration: {
        rootDataDirectory: join(this.homeDirectory, "mtg-collection-manager"),
        cacheDirectory: join(this.appDirectory, ".cache"),
        databaseName: "magic-db.sqlite"

      }
    };
    return result;
  }

  private createApiConfigurationFactoryDefault(): ApiConfigurationDto {
    const result: ApiConfigurationDto = {
      scryfallApiRoot: "https://api.scryfall.com",
      scryfallCardBackRoot: "https://backs.scryfall.io",
      // Scryfall api requests 50-100 ms between calls, let's give it some slack
      scryfallMinimumRequestTimeout: 60,
      authenticationApiRoot: "http://localhost:5401/api",
      libraryApiRoot: "http://localhost:5402/api",
      collectionApiRoot: "http://localhost:5403/api",
      deckApiRoot: "http://localhost:5404/api"
    };
    return result;
  }

  private createPreferencesFactoryDefault(useDarkTheme: boolean): PreferencesDto {
    const result: PreferencesDto = {
      refreshCacheAtStartup: false,
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
  private createDirectoryIfNotExists(directory: string): void {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  }
  // #endregion
}
