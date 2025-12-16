import { ToastProps } from "@blueprintjs/core";
import { InitializeServiceContainerOptions } from "../../types";
import {
  ICardSearchParamService, ICardSymbolService, ICollectionManagerProxyService, IColorService, IConfigurationService,
  IDialogService, IDisplayValueService, IIpcProxyService, ILanguageService, IMtgSetService, IServiceContainer,
  ISessionService, IViewmodelFactoryService
} from "../interface";
import { CardSearchParamService } from "./card-search-param.service";
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
  private _cardSearchParamService: ICardSearchParamService;
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
    this._cardSearchParamService = new CardSearchParamService();
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
  public get cardSearchParamService(): ICardSearchParamService {
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
    this._ipcProxy.initialize(showToast);
    const configuration = await this._configurationService.initialize(this._ipcProxy);
    this._collectionManagerProxy.initialize(this.sessionService, configuration, showToast);
    this._dialogService.initialize(showToast);

    const skippableServices = new Array<Promise<void>>();
    if (!options.skipCardSearchParamService) {
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
