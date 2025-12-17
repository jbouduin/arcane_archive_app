import { ToastProps } from "@blueprintjs/core";
import { SettingsDto as _ConfigurationDto } from "../../../../common/dto";
import { LanguageDto as _LanguageDto, MtgSetTreeDto as _MtgSetTreeDto } from "../../dto";
import { InitializeServiceContainerOptions } from "../../types";
import { ICardSearchService } from "./card-search.service";
import { ICardSymbolService } from "./card-symbol.service";
import { ICollectionManagerProxyService } from "./collection-manager-proxy.service";
import { IColorService } from "./color.service";
import { IConfigurationService } from "./configuration.service";
import { IDialogService } from "./dialog.service";
import { IDisplayValueService } from "./display-value.service";
import { IIpcProxyService } from "./ipc-proxy.service";
import { ILanguageService } from "./language.service";
import { IMtgSetService } from "./mtg-set.service";
import { ISessionService } from "./session.service";
import { IViewmodelFactoryService } from "./viewmodel-factory.service";

export interface IServiceContainer {
  /**
   * Service that caches card search params
   */
  readonly cardSearchService: ICardSearchService;

  /**
   * Service that caches the card symbol svg's
   */
  readonly cardSymbolService: ICardSymbolService;

  /**
   * Collection Manager back end proxy
   */
  readonly collectionManagerProxy: ICollectionManagerProxyService;

  /**
   * Service that caches ColorDtos
   */
  readonly colorService: IColorService;

  /**
   * Service that caches the {@link _ConfigurationDto ConfigurationDto}
   */
  readonly configurationService: IConfigurationService;

  /**
   * Service that displays dialogs
   */
  readonly dialogService: IDialogService;

  /**
   * Dictionaries with display values for enums.
   */
  readonly displayValueService: IDisplayValueService;

  /**
   * Proxy to use Ipc Channels. Processes the response and displays a toast in case of error response.
   */
  readonly ipcProxy: IIpcProxyService;

  /**
   * Service that caches all available {@link _MtgSetTreeDto MtgSetDto}
   */
  readonly mtgSetService: IMtgSetService;

  /**
   * Service that caches all {@link _LanguageDto LanguageDto}
   */
  readonly languageService: ILanguageService;

  /**
   * Session service
   */
  readonly sessionService: ISessionService;

  /**
   * Service that provides viewmodel factories.
   */
  readonly viewmodelFactoryService: IViewmodelFactoryService;

  /**
   * Method called before rendering the window. All other services are initialized and fill their caches.
   * @param showToast the handler to show a toast in the desktop
   */
  initialize(showToast: (props: ToastProps, key?: string) => void, options?: InitializeServiceContainerOptions): Promise<void>;
}
