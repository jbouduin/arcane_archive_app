import { ICardSymbolService, IIpcProxyService } from "../interface";

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
  public getCardSymbolsSvg(cardSymbol: string): string | undefined {
    return this.cardSymbols.get(cardSymbol);
  }

  public async initialize(ipcProxy: IIpcProxyService): Promise<void> {
    const response = await ipcProxy.getData<Map<string, string>>("/card-symbol/svg");
    this.cardSymbols = response;
    return Promise.resolve();
  }
  // #endregion
}
