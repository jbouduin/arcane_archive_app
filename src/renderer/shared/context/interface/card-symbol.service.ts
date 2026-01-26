import { IIpcProxy } from "./ipc-proxy";
import { IServiceContainer } from "./service-container";

export interface ICardSymbolService {
  getCardSymbolsSvg(cardSymbol: string): string | undefined;
  getAllCardSymbols(): Readonly<Map<string, string>>;
  initialize(ipcProxy: IIpcProxy): Promise<void>;
  refreshCardSymbols(serviceContainer: IServiceContainer): Promise<void>;
}
