import { ToastProps } from "@blueprintjs/core";
import { IColorService, IConfigurationService, IDisplayValueService, IIpcProxyService, ILanguageService } from ".";
import { ConfigurationDto as _ConfigurationDto } from "../../../../common/dto";
import { LanguageDto as _LanguageDto, MtgSetDto as _MtgSetDto } from "../../dto";
import { ICardSymbolService } from "./card-symbol.service";
import { IMtgSetService } from "./mtg-set.service";
import { IViewmodelFactoryService } from "./viewmodel-factory.service";

export interface IServiceContainer {
  /**
   * Service that caches the card symbol svg's
   */
  readonly cardSymbolService: ICardSymbolService;

  /**
   * Service that caches ColorDtos
   */
  readonly colorService: IColorService;

  /**
   * Service that caches the {@link _ConfigurationDto ConfigurationDto}
   */
  readonly configurationService: IConfigurationService;

  /**
   * Dictionaries with display values for enums.
   */
  readonly displayValueService: IDisplayValueService;

  /**
   * Proxy to use Ipc Channels. Processes the response and displays a toast in case of error response.
   */
  readonly ipcProxy: IIpcProxyService;

  /**
   * Service that caches all available {@link _MtgSetDto MtgSetDto}
   */
  readonly mtgSetService: IMtgSetService;

  /**
   * Service that caches all {@link _LanguageDto LanguageDto}
   */
  readonly languageService: ILanguageService;

  /**
   * Service that provides viewmodel factories.
   */
  readonly viewmodelFactoryService: IViewmodelFactoryService;

  /**
   * Method called before rendering the window. All other services are initialized and fill their caches.
   * @param showToast the handler to show a toast in the desktop
   */
  initialize(showToast: (props: ToastProps, key?: string) => void): Promise<void>;
}
