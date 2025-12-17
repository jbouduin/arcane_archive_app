import { ToastProps } from "@blueprintjs/core";
import { InitializeServiceContainerOptions } from "../../types";
import {
  ICardSearchService, ICardSymbolService, ICollectionManagerProxyService, IColorService, IConfigurationService,
  IDialogService, IDisplayValueService, IIpcProxyService, ILanguageService, IMtgSetService, IServiceContainer,
  ISessionService, IViewmodelFactoryService
} from "../interface";
import { CardSearchService } from "./card-search.service";
import { CardSymbolService } from "./card-symbol.service";
import { CollectionManagerProxyService } from "./collection-manager-proxy.service";
import { ColorService } from "./color.service";
import { ConfigurationService } from "./configuration.service";
import { DialogService } from "./dialog.service";
import { DisplayValueService } from "./display-value.service";
import { IpcProxyService } from "./ipc-proxy.service";
import { LanguageService } from "./language.service";
import { MtgSetService } from "./mtg-set.service";
import { SessionService } from "./session.service";
import { ViewmodelFactoryService } from "./viewmodel-factory.service";

export class ServiceContainer implements IServiceContainer {
  // #region Private fields ---------------------------------------------------
  private _cardSearchParamService: ICardSearchService;
  private _cardSymbolService: ICardSymbolService;
  private _collectionManagerProxy: ICollectionManagerProxyService;
  private _colorService: IColorService;
  private _configurationService: IConfigurationService;
  private _displayValueService: IDisplayValueService;
  private _dialogService: IDialogService;
  private _ipcProxy: IIpcProxyService;
  private _languageService: ILanguageService;
  private _mtgSetService: IMtgSetService;
  private _sessionService: ISessionService;
  private _viewmodelFactoryService: IViewmodelFactoryService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._cardSearchParamService = new CardSearchService();
    this._cardSymbolService = new CardSymbolService();
    this._collectionManagerProxy = new CollectionManagerProxyService();
    this._colorService = new ColorService();
    this._configurationService = new ConfigurationService();
    this._displayValueService = new DisplayValueService();
    this._dialogService = new DialogService();
    this._ipcProxy = new IpcProxyService();
    this._languageService = new LanguageService();
    this._mtgSetService = new MtgSetService();
    this._sessionService = new SessionService();
    this._viewmodelFactoryService = new ViewmodelFactoryService();
  }
  // #endregion

  // #region IServiceContainer Members (getters) ------------------------------
  public get cardSearchService(): ICardSearchService {
    return this._cardSearchParamService;
  }

  public get cardSymbolService(): ICardSymbolService {
    return this._cardSymbolService;
  }

  public get collectionManagerProxy(): ICollectionManagerProxyService {
    return this._collectionManagerProxy;
  }

  public get colorService(): IColorService {
    return this._colorService;
  }

  public get configurationService(): IConfigurationService {
    return this._configurationService;
  }

  public get dialogService(): IDialogService {
    return this._dialogService;
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
  public async initialize(showToast: (props: ToastProps, key?: string) => void, options: InitializeServiceContainerOptions = {}): Promise<void> {
    // TODO: if initializing one of the services fails: toastCall is used, but as there is
    // no window, they will never be displayed to the user
    // solution:
    // - pass a fake showToast to the initialize calls of the proxies (dialogservice does not need it) that intercepts the toast calls a
    // - return array of errors or even ToastProps from this method with all intercepted toast call methods
    // - set the real toast call in the services
    // - somewhere we have to check if
    //   - discovery succeeded (currently back-end gives a dialog-box)
    //   - library service is available -> if not: that was it
    //   - authentication service is available -> although we could check in the this in the login/register dialog itself also
    //   - deck, collection service is available  -> could be checked when selecting that view, combined with authentication service availability
    //     because the deck and collection services can not be used without authentication
    this._ipcProxy.initialize(showToast);
    const configuration = await this._configurationService.initialize(this._ipcProxy);
    this._collectionManagerProxy.initialize(this.sessionService, configuration, showToast);
    this._dialogService.initialize(showToast);

    const skippableServices = new Array<Promise<void>>();
    if (!options.skipCardSearchService) {
      skippableServices.push(this._cardSearchParamService.initialize(this._collectionManagerProxy));
    }
    if (!options.skipCardSymbolService) {
      skippableServices.push(this._cardSymbolService.initialize(this._ipcProxy));
    }
    if (!options.skipColorService) {
      skippableServices.push(this._colorService.initialize(this._collectionManagerProxy));
    }
    if (!options.skipDisplayValueService) {
      skippableServices.push(this._displayValueService.initialize(this._collectionManagerProxy));
    }
    if (!options.skipLanguageService) {
      skippableServices.push(this._languageService.initialize(this._collectionManagerProxy));
    }
    if (!options.skipMtgSetService) {
      skippableServices.push(this._mtgSetService.initialize(this._collectionManagerProxy));
    }
    if (!options.skipSessionService) {
      skippableServices.push(this._sessionService.initialize(this._ipcProxy, this._configurationService));
    }

    await Promise.all(skippableServices);
    this._viewmodelFactoryService.initialize(
      this._colorService,
      this._displayValueService,
      this._languageService,
      this._mtgSetService
    );
  }
  // #endregion
};
