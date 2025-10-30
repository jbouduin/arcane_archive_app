import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { inject, singleton } from "tsyringe";
import { ConfigurationDto, RendererConfigurationDto } from "../../../../common/dto";
import { BaseService, IResult } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, ILogService, IResultFactory } from "../interface";


@singleton()
export class ConfigurationService extends BaseService implements IConfigurationService {
  //#region Private fields ----------------------------------------------------
  private configFilePath!: string;
  private appDirectory!: string;
  private homeDirectory!: string;
  private useDarkTheme!: boolean;
  private _configuration!: ConfigurationDto;
  private _isFirstUsage!: boolean;
  //#endregion

  //#region IConfigurationService properties ----------------------------------
  public get configuration(): ConfigurationDto {
    return this._configuration;
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
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    @inject(INFRASTRUCTURE.LogService) logService: ILogService,
    @inject(INFRASTRUCTURE.ResultFactory) resultFactory: IResultFactory
  ) {
    super(logService, resultFactory);
  }
  //#endregion

  //#region ISettingsService methods ------------------------------------------
  public loadSettings(appDirectory: string, homeDirectory: string, useDarkTheme: boolean): void {
    this.appDirectory = appDirectory;
    this.homeDirectory = homeDirectory;
    this.useDarkTheme = useDarkTheme;
    this.configFilePath = join(appDirectory, "collection-manager.config.json");
    if (existsSync(this.configFilePath)) {
      this._configuration = JSON.parse(readFileSync(this.configFilePath, "utf-8")) as ConfigurationDto;
      this._isFirstUsage = false;
    } else {
      this._configuration = this.createFactoryDefault();
      this._isFirstUsage = true;
    }
  }
  //#endregion

  //#region Route callbacks ---------------------------------------------------
  public getSettings(): Promise<IResult<ConfigurationDto>> {        
    return this.resultFactory.createSuccessResultPromise(this._configuration);
  }

  public getFactoryDefault(): Promise<IResult<ConfigurationDto>> {
    return this.resultFactory.createSuccessResultPromise(this.createFactoryDefault());
  }

  public putSettings(configuration: ConfigurationDto): Promise<IResult<ConfigurationDto>> {
    // LATER Validation
    this.createDirectoryIfNotExists(dirname(this.configFilePath));
    writeFileSync(this.configFilePath, JSON.stringify(configuration, null, 2));
    this._configuration = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<ConfigurationDto>(configuration);
  }

  public setSettings(configuration: ConfigurationDto): Promise<IResult<ConfigurationDto>> {
    writeFileSync(this.configFilePath, JSON.stringify(configuration, null, 2));
    this._configuration = configuration;
    this._isFirstUsage = false;
    return this.resultFactory.createSuccessResultPromise<ConfigurationDto>(configuration);
  }
  //#endregion

  //#region Auxiliary factory default methods ---------------------------------
  private createFactoryDefault(): ConfigurationDto {
    const result: ConfigurationDto = {
      dataConfiguration: {
        rootDataDirectory: join(this.homeDirectory, "mtg-collection-manager"),
        cacheDirectory: join(this.appDirectory, ".cache"),
        databaseName: "magic-db.sqlite"
      },
      rendererConfiguration: this.createRendererConfigurationFactoryDefault(this.useDarkTheme)
    };
    return result;
  }

//   private createScryFallFactoryDefault(): IScryfallConfigurationDto {
//     const endpoints: Record<ScryfallEndpoint, string> = {
//       bulk: "bulk-data",
//       cards: "card/:id",
//       cardSet: "sets",
//       cardSymbol: "symbology",
//       catalog: "catalog",
//       collection: "cards/collection",
//       ruling: "cards/:id/rulings",
//       search: "cards/search"
//     };

//     const result: IScryfallConfigurationDto = {
//       cardBackRoot: "https://backs.scryfall.io",
//       scryfallApiRoot: "https://api.scryfall.com",
//       scryfallEndpoints: endpoints,

//       // Scryfall api requests 50-100 ms between calls, let's give it some slack
//       minimumRequestTimeout: 60,
//       dumpRetrievedData: false,
//       // Scryfall api allows up to 75 per collection
//       collectionChunkSize: 50
//     };
//     return result;
//   }

//   private createSyncAtStartupFactoryDefault(): ISyncParamDto {
//     const result: ISyncParamDto = {
//       catalogTypesToSync: [],
//       bulkSyncUrl: undefined,
//       syncCardSymbols: false,
//       syncCardSets: false,
//       rulingSyncType: "none",
//       cardSyncType: "none",
//       cardSelectionToSync: [],
//       cardImageStatusToSync: [],
//       syncCardsSyncedBeforeNumber: 0,
//       syncCardsSyncedBeforeUnit: undefined,
//       cardSetCodeToSyncCardsFor: undefined,
//       changedImageStatusAction: "delete",
//       oracleId: undefined
//     };
//     return result;
//   }

  private createRendererConfigurationFactoryDefault(useDarkTheme: boolean): RendererConfigurationDto {
    const result: RendererConfigurationDto = {
      useDarkTheme: useDarkTheme,
      logServerResponses: false,
      mtgSetTreeViewConfiguration: {
        cardSetSort: "releaseDateDescending",
        cardSetGroupBy: "parent",
        cardSetTypeFilter: [
          "core",
          "expansion",
          "token",
          "starter",
          "duel_deck",
          "promo"
        ]
      }
    };
    return result;
  }
  //#endregion

  //#region Auxiliary validation related methods ------------------------------
  private createDirectoryIfNotExists(directory: string): void {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  }
  //#endregion
}
