import { SettingsDto as _ConfigurationDto } from "../../../../common/dto";
import { LanguageDto as _LanguageDto, MtgSetTreeDto as _MtgSetTreeDto } from "../../dto";
import { InitializeServiceContainerOptions, ShowToastFn } from "../../types";
import { InitializationResult } from "../types";
import { ICardSearchService } from "./card-search.service";
import { ICardSymbolService } from "./card-symbol.service";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";
import { IColorService } from "./color.service";
import { IConfigurationService } from "./configuration.service";
import { IDisplayValueService } from "./display-value.service";
import { IIpcProxyService } from "./ipc-proxy.service";
import { ILanguageService } from "./language.service";
import { ILogService } from "./log.service";
import { IMtgSetService } from "./mtg-set.service";
import { IOverlayService } from "./overlay.service";
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
   * Arcane Archive back end proxy
   */
  readonly arcaneArchiveProxy: IArcaneArchiveProxyService;

  /**
   * Service that caches ColorDtos
   */
  readonly colorService: IColorService;

  /**
   * Service that caches the {@link _ConfigurationDto ConfigurationDto}
   */
  readonly configurationService: IConfigurationService;

  /**
   * Service that displays dialogs, toasts, alert, and splash screen
   */
  readonly overlayService: IOverlayService;

  /**
   * Dictionaries with display values for enums.
   */
  readonly displayValueService: IDisplayValueService;

  /**
   * Proxy to use Ipc Channels. Processes the response and displays a toast in case of error response.
   */
  readonly ipcProxy: IIpcProxyService;

  /**
   * Log service
   */
  readonly logService: ILogService;

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
  initialize(showToast: ShowToastFn, options?: InitializeServiceContainerOptions): Promise<InitializationResult>;
}
