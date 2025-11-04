import { IIpcProxyService } from "./ipc-proxy.service";

export interface ICardSymbolService {
  getCardSymbolsSvg(cardSymbol: string): string | undefined;
  getAllCardSymbols(): Readonly<Map<string, string>>;
  initialize(ipcProx: IIpcProxyService): Promise<void>;
}
