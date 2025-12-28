import { IIpcProxyService } from "./ipc-proxy.service";
import { IServiceContainer } from "./service-container";

export interface ICardSymbolService {
  getCardSymbolsSvg(cardSymbol: string): string | undefined;
  getAllCardSymbols(): Readonly<Map<string, string>>;
  initialize(ipcProxy: IIpcProxyService): Promise<void>;
  refreshCardSymbols(serviceContainer: IServiceContainer): Promise<void>;
}
