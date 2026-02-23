import { ToastProps } from "@blueprintjs/core";
import { SettingsDto } from "../../../../common/dto";
import { InitializeServiceContainerOptions, ShowToastFn } from "../../types";
import {
  IArcaneArchiveProxy, IBasicDataService, ICardSymbolService, ICollectionCardSearchService,
  ICollectionService, IConfigurationService, IIpcProxy, ILibraryCardSearchService, ILogService,
  IMtgSetService, IOverlayService, IServiceContainer, ISessionService, ISynchronizeService, IViewmodelFactoryService
} from "../interface";
import { InitializationResult } from "../types";
import { ArcaneArchiveProxy } from "./arcane-archive.proxy";
import { BasicDataService } from "./basic-data.service";
import { CardSymbolService } from "./card-symbol.service";
import { CollectionCardSearchService } from "./collection-card-search.service";
import { CollectionService } from "./collection.service";
import { ConfigurationService } from "./configuration.service";
import { IpcProxy } from "./ipc.proxy";
import { LibraryCardSearchService } from "./library-card-search.service";
import { LogService } from "./log.service";
import { MtgSetService } from "./mtg-set.service";
import { OverlayService } from "./overlay.service";
import { SessionService } from "./session.service";
import { ViewmodelFactoryService } from "./viewmodel-factory.service";
import { IMtgCardService } from "../interface/mtg-card.service";
import { MtgCardService } from "./mtg-card.service";
import { SynchronizeService } from "./synchronize.service";

export class ServiceContainer implements IServiceContainer {
  //#region Private fields ----------------------------------------------------
  private _arcaneArchiveProxy: IArcaneArchiveProxy;
  private _basicDataService: IBasicDataService;
  private _cardSymbolService: ICardSymbolService;
  private _collectionService: ICollectionService;
  private _collectionCardSearchService: ICollectionCardSearchService;
  private _configurationService: IConfigurationService;
  private _ipcProxy: IIpcProxy;
  private _libraryCardSearchService: ILibraryCardSearchService;
  private _logService: ILogService;
  private _mtgCardService: IMtgCardService;
  private _mtgSetService: IMtgSetService;
  private _overlayService: IOverlayService;
  private _sessionService: ISessionService;
  private _synchronizeService: ISynchronizeService;
  private _viewmodelFactoryService: IViewmodelFactoryService;
  //#endregion

  //#region IServiceContainer Members (getters) -------------------------------
  public get arcaneArchiveProxy(): IArcaneArchiveProxy {
    return this._arcaneArchiveProxy;
  }

  public get basicDataService(): IBasicDataService {
    return this._basicDataService;
  }

  public get cardSymbolService(): ICardSymbolService {
    return this._cardSymbolService;
  }

  public get collectionService(): ICollectionService {
    return this._collectionService;
  }

  public get collectionCardSearchService(): ICollectionCardSearchService {
    return this._collectionCardSearchService;
  }

  public get configurationService(): IConfigurationService {
    return this._configurationService;
  }

  public get ipcProxy(): IIpcProxy {
    return this._ipcProxy;
  }

  public get libraryCardSearchService(): ILibraryCardSearchService {
    return this._libraryCardSearchService;
  }

  public get logService(): ILogService {
    return this._logService;
  }

  public get mtgCardService(): IMtgCardService {
    return this._mtgCardService;
  }

  public get mtgSetService(): IMtgSetService {
    return this._mtgSetService;
  }

  public get overlayService(): IOverlayService {
    return this._overlayService;
  }

  public get sessionService(): ISessionService {
    return this._sessionService;
  }

  public get synchronizeService(): ISynchronizeService {
    return this._synchronizeService;
  }

  public get viewmodelFactoryService(): IViewmodelFactoryService {
    return this._viewmodelFactoryService;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this._arcaneArchiveProxy = new ArcaneArchiveProxy();
    this._basicDataService = new BasicDataService();
    this._cardSymbolService = new CardSymbolService();
    this._collectionService = new CollectionService();
    this._collectionCardSearchService = new CollectionCardSearchService();
    this._configurationService = new ConfigurationService();
    this._ipcProxy = new IpcProxy();
    this._libraryCardSearchService = new LibraryCardSearchService();
    this._logService = new LogService();
    this._mtgCardService = new MtgCardService();
    this._mtgSetService = new MtgSetService();
    this._overlayService = new OverlayService();
    this._sessionService = new SessionService();
    this._synchronizeService = new SynchronizeService();
    this._viewmodelFactoryService = new ViewmodelFactoryService();
  }
  //#endregion

  //#region IServiceContainer Members (methods) -------------------------------
  public async initialize(
    showToast: ShowToastFn,
    options: InitializeServiceContainerOptions = {}
  ): Promise<InitializationResult> {
    const result: InitializationResult = {
      isOk: true,
      errors: new Array<ToastProps>()
    };

    // --- pre-initialize: setup listeners, unfortunately the order is important ---
    this._arcaneArchiveProxy.initializeSubscriptions(this._sessionService, this._configurationService);
    this._ipcProxy.initializeSubscriptions(this._configurationService);
    this._sessionService.initializeSubscriptions(this._arcaneArchiveProxy, this._ipcProxy);

    this._collectionService.initializeSubscriptions(this._sessionService);

    // --- show toast "interceptor" to be used during initialization ---
    const initializationShowToast: ShowToastFn = (props: ToastProps, _key?: string) => {
      if (props.intent == "warning" || props.intent == "danger") {
        result.isOk = false;
      }
      result.errors.push(props);
    };

    // --- initialize Proxies with initialization show toast ---
    this._ipcProxy.setShowToast(initializationShowToast);
    this._arcaneArchiveProxy.setShowToast(initializationShowToast);

    // --- initialize log service ---
    this._logService.initialize(this._ipcProxy);

    // !!! all services should be able to handle a second initialization call !!!
    await this._configurationService.initialize(this._ipcProxy)
      .then(
        async (configuration: SettingsDto) => {
          result.settings = configuration;
          this._arcaneArchiveProxy.initialize(configuration.apiConfiguration);
          if (!options.skipLibraryCardService) {
            this._libraryCardSearchService.initialize(this._arcaneArchiveProxy, configuration.preferences);
          }
          if (!options.skipMtgCardService) {
            this._mtgCardService.initialize(this._arcaneArchiveProxy);
          }
          if (!options.skipCollectionCardSearchService) {
            this._collectionCardSearchService.initialize(this._arcaneArchiveProxy, configuration.preferences);
          }
          if (!options.skipCollectionService) {
            this._collectionService.initialize(this._ipcProxy, this._arcaneArchiveProxy);
          }
          if (!options.skipSynchronizeService) {
            this._synchronizeService.initialize(this._arcaneArchiveProxy);
          }
          // --- get api status once, automatic refresh is started by the  ---
          const apiStatus = await this._arcaneArchiveProxy.forceRefresh();
          if (apiStatus.get("library") != null) {
            // These skippable services do (may!) not reject
            const skippableServices = new Array<Promise<void>>();
            if (!options.skipCardSymbolService) {
              skippableServices.push(this._cardSymbolService.initialize(this._ipcProxy));
            }
            if (!options.skipDisplayValueService) {
              skippableServices.push(this._basicDataService.initialize(this._arcaneArchiveProxy));
            }
            if (!options.skipMtgSetService) {
              skippableServices.push(this._mtgSetService.initialize(this._arcaneArchiveProxy));
            }
            if (!options.skipSessionService) {
              skippableServices.push(this._sessionService.initialize(this));
            }

            await Promise.all(skippableServices)
              .then(
                () => {
                  this._viewmodelFactoryService.initialize(
                    this._basicDataService,
                    this._collectionService,
                    this._mtgSetService
                  );
                },
                () => result.isOk = false
              );
          } else {
            initializationShowToast({ message: "Service not available" });
            result.isOk = false;
          }
        },
        () => {
          result.isOk = false; // configuration could not be retrieved}
          result.errors.push({ message: "Could not load configuration" });
        }
      )
      .finally(() => {
        // --- set real toast in services ---
        this._overlayService.setShowToast(showToast);
        this._ipcProxy.setShowToast(showToast);
        this._arcaneArchiveProxy.setShowToast(showToast);
      });
    return result;
  }
  //#endregion
};
