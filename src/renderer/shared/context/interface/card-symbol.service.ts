import { IIpcProxyService } from "./ipc-proxy.service";

export interface ICardSymbolService {
  getCardSymbolsSvg(cardSymbol: string): string | undefined;

  initialize(ipcProx: IIpcProxyService): Promise<void>;
}
