import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { inject, singleton } from "tsyringe";
import { PreferencesDto, SettingsDto } from "../../../../common/dto";
import { ApiConfigurationDto } from "../../../../common/dto/infra/api-configuration.dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, ILogService, IResultFactory } from "../interface";

@singleton()
export class ConfigurationService extends BaseService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private configFilePath!: string;
  private appDirectory!: string;
  private homeDirectory!: string;
  private useDarkTheme!: boolean;
  private _configuration!: SettingsDto;
  private _isFirstUsage!: boolean;
  // #endregion

  // #region IConfigurationService properties ---------------------------------
  public get configuration(): SettingsDto {
    return this._configuration;
  }

  public get isFirstUsage(): boolean {
    return this._isFirstUsage;
  }

  public get dataBaseFilePath(): string {
    return join(
      this._configuration.systemConfiguration.dataConfiguration.rootDataDirectory,
      this._configuration.systemConfiguration.dataConfiguration.databaseName
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
  public loadSettings(appDirectory: string, homeDirectory: string, useDarkTheme: boolean): void {
    this.appDirectory = appDirectory;
    this.homeDirectory = homeDirectory;
    this.useDarkTheme = useDarkTheme;
    this.configFilePath = join(appDirectory, "collection-manager.config.json");
    if (existsSync(this.configFilePath)) {
      this._configuration = JSON.parse(readFileSync(this.configFilePath, "utf-8")) as SettingsDto;
      this._isFirstUsage = false;
    } else {
      this._configuration = this.createFactoryDefault();
      this._isFirstUsage = true;
    }
  }
  // #endregion

  // #region Route callbacks --------------------------------------------------
  public getSettings(): Promise<IResult<SettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this._configuration);
  }

  public getFactoryDefault(): Promise<IResult<SettingsDto>> {
    return this.resultFactory.createSuccessResultPromise(this.createFactoryDefault());
  }

  public putSettings(configuration: SettingsDto): Promise<IResult<SettingsDto>> {
    // LATER Validation
    this.createDirectoryIfNotExists(dirname(this.configFilePath));
    writeFileSync(this.configFilePath, JSON.stringify(configuration, null, 2));
    this._configuration = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<SettingsDto>(configuration);
  }

  public setSettings(configuration: SettingsDto): Promise<IResult<SettingsDto>> {
    writeFileSync(this.configFilePath, JSON.stringify(configuration, null, 2));
    this._configuration = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<SettingsDto>(configuration);
  }
  // #endregion

  // #region Auxiliary factory default methods --------------------------------
  private createFactoryDefault(): SettingsDto {
    const result: SettingsDto = {
      systemConfiguration: {
        apiConfiguration: this.createApiConfigurationFactoryDefault(),
        dataConfiguration: {
          rootDataDirectory: join(this.homeDirectory, "mtg-collection-manager"),
          cacheDirectory: join(this.appDirectory, ".cache"),
          databaseName: "magic-db.sqlite"
        }
      },
      preferences: this.createRendererConfigurationFactoryDefault(this.useDarkTheme)
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

  private createRendererConfigurationFactoryDefault(useDarkTheme: boolean): PreferencesDto {
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
