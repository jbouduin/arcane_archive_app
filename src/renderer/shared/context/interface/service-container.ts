import { SettingsDto as _ConfigurationDto } from "../../../../common/dto";
import { MtgSetTreeDto as _MtgSetTreeDto } from "../../dto";
import { InitializeServiceContainerOptions, ShowToastFn } from "../../types";
import { InitializationResult } from "../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";
import { IBasicDataService } from "./basic-data.service";
import { ICardSymbolService } from "./card-symbol.service";
import { ICollectionCardSearchService } from "./collection-card-search.service";
import { ICollectionService } from "./collection.service";
import { IConfigurationService } from "./configuration.service";
import { IIpcProxy } from "./ipc-proxy";
import { ILibraryCardSearchService } from "./library-card-search.service";
import { ILogService } from "./log.service";
import { IMtgCardService } from "./mtg-card.service";
import { IMtgSetService } from "./mtg-set.service";
import { IOverlayService } from "./overlay.service";
import { ISessionService } from "./session.service";
import { ISynchronizeService } from "./synchronize.service";
import { IViewmodelFactoryService } from "./viewmodel-factory.service";

export interface IServiceContainer {
  /**
   * Arcane Archive back end proxy
   */
  readonly arcaneArchiveProxy: IArcaneArchiveProxy;

  /**
   * Dictionaries with basic data. (Display values, Colors, Languages, Card Conditions)
   */
  readonly basicDataService: IBasicDataService;

  /**
   * Service that caches the card symbol svg's
   */
  readonly cardSymbolService: ICardSymbolService;

  /**
   * Collection service
   */
  readonly collectionService: ICollectionService;

  /**
   * Service to search collection cards. Also serves as cache for queryparams and result.
   */
  readonly collectionCardSearchService: ICollectionCardSearchService;

  /**
   * Service that caches the {@link _ConfigurationDto ConfigurationDto}
   */
  readonly configurationService: IConfigurationService;

  /**
   * Proxy to use Ipc Channels. Processes the response and displays a toast in case of error response.
   */
  readonly ipcProxy: IIpcProxy;

  /**
   * Service to search library cards. Also serves as cache for queryparams and result.
   */
  readonly libraryCardSearchService: ILibraryCardSearchService;

  /**
   * Log service
   */
  readonly logService: ILogService;

  /**
   * Service to get MtgCard data
   */
  readonly mtgCardService: IMtgCardService;

  /**
   * Service that caches all available {@link _MtgSetTreeDto MtgSetDto}
   */
  readonly mtgSetService: IMtgSetService;

  /**
   * Service that displays dialogs, toasts, alert, and splash screen
   */
  readonly overlayService: IOverlayService;

  /**
   * Session service
   */
  readonly sessionService: ISessionService;

  /**
   * Synchronization service
   */
  readonly synchronizeService: ISynchronizeService;

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
