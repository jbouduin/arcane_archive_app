import { IConfigurationService, IDisplayValueService, IIpcProxyService, ILanguageService } from "./interface";

export interface IServiceContainer {
    ipcProxy: IIpcProxyService;   
    displayValueService: IDisplayValueService;
    configurationService: IConfigurationService;  
    languageService: ILanguageService;
}