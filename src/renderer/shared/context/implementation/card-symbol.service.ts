import { noop } from "lodash";
import { IpcPaths } from "../../../../common/ipc";
import { ICardSymbolService, IIpcProxyService, IServiceContainer } from "../interface";

// LATER add sync card symbols method
export class CardSymbolService implements ICardSymbolService {
  // #region Private fields ---------------------------------------------------
  private cardSymbols: Map<string, string>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.cardSymbols = new Map<string, string>();
  }
  // #endregion

  // #region ICardSymbolService Members ---------------------------------------
  public getAllCardSymbols(): Readonly<Map<string, string>> {
    return this.cardSymbols;
  }

  public getCardSymbolsSvg(cardSymbol: string): string | undefined {
    return this.cardSymbols.get(cardSymbol);
  }

  public async initialize(ipcProxy: IIpcProxyService): Promise<void> {
    return ipcProxy.getData<Map<string, string>>(IpcPaths.CARD_SYMBOL_SVG)
      .then(
        (data: Map<string, string>) => {
          this.cardSymbols = data;
        },
        noop
      );
  }

  public async refreshCardSymbols(serviceContainer: IServiceContainer): Promise<void> {
    serviceContainer.overlayService.showSplashScreen("Refreshing...");
    await serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.CARD_SYMBOL_REFRESH)
      .then(
        () => this.initialize(serviceContainer.ipcProxy),
        noop
      )
      .finally(() => serviceContainer.overlayService.hideSplashSceen());
  }
  // #endregion
}
