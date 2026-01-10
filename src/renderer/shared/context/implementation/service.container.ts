import { ToastProps } from "@blueprintjs/core";
import { SettingsDto } from "../../../../common/dto";
import { InitializeServiceContainerOptions, ShowToastFn } from "../../types";
import {
  IArcaneArchiveProxyService,
  ICardSearchService, ICardSymbolService,
  ICollectionService,
  IColorService, IConfigurationService,
  IDisplayValueService, IIpcProxyService, ILanguageService, ILogService, IMtgSetService,
  IOverlayService, IServiceContainer, ISessionService, IViewmodelFactoryService
} from "../interface";
import { InitializationResult } from "../types";
import { ArcaneArchiveProxyService } from "./arcane-archive-proxy.service";
import { CardSearchService } from "./card-search.service";
import { CardSymbolService } from "./card-symbol.service";
import { CollectionService } from "./collection.service";
import { ColorService } from "./color.service";
import { ConfigurationService } from "./configuration.service";
import { DisplayValueService } from "./display-value.service";
import { IpcProxyService } from "./ipc-proxy.service";
import { LanguageService } from "./language.service";
import { LogService } from "./log.service";
import { MtgSetService } from "./mtg-set.service";
import { OverlayService } from "./overlay.service";
import { SessionService } from "./session.service";
import { ViewmodelFactoryService } from "./viewmodel-factory.service";

export class ServiceContainer implements IServiceContainer {
  // #region Private fields ---------------------------------------------------
  private _cardSearchService: ICardSearchService;
  private _cardSymbolService: ICardSymbolService;
  private _arcaneArchiveProxy: IArcaneArchiveProxyService;
  private _collectionSerivce: ICollectionService;
  private _colorService: IColorService;
  private _configurationService: IConfigurationService;
  private _displayValueService: IDisplayValueService;
  private _overlayService: IOverlayService;
  private _ipcProxy: IIpcProxyService;
  private _languageService: ILanguageService;
  private _logService: ILogService;
  private _mtgSetService: IMtgSetService;
  private _sessionService: ISessionService;
  private _viewmodelFactoryService: IViewmodelFactoryService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._cardSearchService = new CardSearchService();
    this._cardSymbolService = new CardSymbolService();
    this._arcaneArchiveProxy = new ArcaneArchiveProxyService();
    this._collectionSerivce = new CollectionService();
    this._colorService = new ColorService();
    this._configurationService = new ConfigurationService();
    this._displayValueService = new DisplayValueService();
    this._overlayService = new OverlayService();
    this._ipcProxy = new IpcProxyService();
    this._languageService = new LanguageService();
    this._logService = new LogService();
    this._mtgSetService = new MtgSetService();
    this._sessionService = new SessionService();
    this._viewmodelFactoryService = new ViewmodelFactoryService();
  }
  // #endregion

  // #region IServiceContainer Members (getters) ------------------------------
  public get cardSearchService(): ICardSearchService {
    return this._cardSearchService;
  }

  public get cardSymbolService(): ICardSymbolService {
    return this._cardSymbolService;
  }

  public get arcaneArchiveProxy(): IArcaneArchiveProxyService {
    return this._arcaneArchiveProxy;
  }

  public get collectionService(): ICollectionService {
    return this._collectionSerivce;
  }

  public get colorService(): IColorService {
    return this._colorService;
  }

  public get configurationService(): IConfigurationService {
    return this._configurationService;
  }

  public get overlayService(): IOverlayService {
    return this._overlayService;
  }

  public get displayValueService(): IDisplayValueService {
    return this._displayValueService;
  }

  public get ipcProxy(): IIpcProxyService {
    return this._ipcProxy;
  }

  public get languageService(): ILanguageService {
    return this._languageService;
  }

  public get logService(): ILogService {
    return this._logService;
  }

  public get mtgSetService(): IMtgSetService {
    return this._mtgSetService;
  }

  public get sessionService(): ISessionService {
    return this._sessionService;
  }

  public get viewmodelFactoryService(): IViewmodelFactoryService {
    return this._viewmodelFactoryService;
  }
  // #endregion

  // #region IServiceContainer Members (methods) ------------------------------
  public async initialize(
    showToast: ShowToastFn,
    options: InitializeServiceContainerOptions = {}
  ): Promise<InitializationResult> {
    const result: InitializationResult = {
      isOk: true,
      errors: new Array<ToastProps>()
    };

    // -- show toast "interceptor" to be used during initialization --
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
          this._arcaneArchiveProxy.initialize(this._configurationService, this._sessionService, configuration);
          this._ipcProxy.initialize(this._configurationService, configuration.preferences);
          const apiStatus = await this._arcaneArchiveProxy.startRefreshing();
          if (apiStatus.get("library") != null) {
            // Skippable services do (should) not reject
            const skippableServices = new Array<Promise<void>>();
            if (!options.skipCardSearchService) {
              skippableServices.push(this._cardSearchService.initialize(this._arcaneArchiveProxy, configuration.preferences));
            }
            if (!options.skipCardSymbolService) {
              skippableServices.push(this._cardSymbolService.initialize(this._ipcProxy));
            }
            if (!options.skipColorService) {
              skippableServices.push(this._colorService.initialize(this._arcaneArchiveProxy));
            }
            if (!options.skipDisplayValueService) {
              skippableServices.push(this._displayValueService.initialize(this._arcaneArchiveProxy));
            }
            if (!options.skipLanguageService) {
              skippableServices.push(this._languageService.initialize(this._arcaneArchiveProxy));
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
                  this._collectionSerivce.initialize(this._arcaneArchiveProxy);
                  this._viewmodelFactoryService.initialize(
                    this._colorService,
                    this._displayValueService,
                    this._languageService,
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
  // #endregion
};
