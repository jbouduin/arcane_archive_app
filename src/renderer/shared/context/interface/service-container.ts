import { IConfigurationService } from "./configuration.service";
import { IIpcProxyService } from "./ipc-proxy.service";

export interface IServiceContainer {
    ipcProxy: IIpcProxyService;   
    configurationService: IConfigurationService;  
}