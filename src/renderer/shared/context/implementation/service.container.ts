import { ToastProps } from "@blueprintjs/core";
import { IConfigurationService, IDisplayValueService, IIpcProxyService, ILanguageService, IMtgSetService, IServiceContainer, IViewmodelFactoryService } from "../interface";
import { ConfigurationService } from "./configuration.service";
import { DisplayValueService } from "./display-value.service";
import { IpcProxyService } from "./ipc-proxy.service";
import { LanguageService } from "./language.service";
import { MtgSetService } from "./mtg-set.service";
import { ViewmodelFactoryService } from "./viewmodel-factory.service";

export class ServiceContainer implements IServiceContainer {
  // #region Private fields ---------------------------------------------------
  private _configurationService: IConfigurationService;
  private _displayValueService: IDisplayValueService;
  private _ipcProxy: IIpcProxyService;
  private _languageService: ILanguageService;
  private _mtgSetService: IMtgSetService;
  private _viewmodelFactoryService: IViewmodelFactoryService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._configurationService = new ConfigurationService();
    this._displayValueService = new DisplayValueService();
    this._ipcProxy = new IpcProxyService();
    this._languageService = new LanguageService();
    this._mtgSetService = new MtgSetService();
    this._viewmodelFactoryService = new ViewmodelFactoryService();
  }
  // #endregion

  // #region IServiceContainer Members ----------------------------------------
  public get configurationService(): IConfigurationService {
    return this._configurationService;
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

  public get viewmodelFactoryService(): IViewmodelFactoryService {
    return this._viewmodelFactoryService;
  }

  public async initialize(showToast: (props: ToastProps, key?: string) => void): Promise<void> {
    this._ipcProxy.initialize(showToast);

    const configuration = await this._configurationService.initialize(this._ipcProxy);

    await Promise.all([
      this._configurationService.initialize(this._ipcProxy),
      this._displayValueService.initialize(configuration.apiConfiguration),
      this._languageService.initialize(configuration.apiConfiguration),
      this._mtgSetService.initialize(configuration.apiConfiguration)
    ]);

    this._viewmodelFactoryService.initialize(this._displayValueService);
  }
  // #endregion
};
