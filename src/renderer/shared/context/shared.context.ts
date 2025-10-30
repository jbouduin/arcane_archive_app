import React from "react";
import { IServiceContainer } from "./service-container";
import { ConfigurationService } from "./implementation/configuration.service";
import { LanguageService } from "./implementation/language.service";
import { DisplayValueService } from "./implementation/display-value.service";


const defaultServiceContainer: IServiceContainer = {
  configurationService: new ConfigurationService(),
  displayValueService: new DisplayValueService(),
  ipcProxy: {
    logServerResponses: false,
    deleteData: function (path: string): Promise<number> {
      throw new Error("IpcProxyService not initialized");
    },
    getData: function <T extends object | string>(path: string): Promise<T> {
      throw new Error("IpcProxyService not initialized");
    },
    postData: function <T extends object, U extends object>(path: string, data: T): Promise<U> {
      throw new Error("IpcProxyService not initialized");
    },
    putData: function <T extends object, U extends object>(path: string, data: T): Promise<U> {
      throw new Error("IpcProxyService not initialized");
    },
    patchData: function <T extends object, U extends object>(path: string, data: T): Promise<U> {
      throw new Error("IpcProxyService not initialized");
    }
  },
  languageService: new LanguageService()
};

export const ServiceContainerContext = React.createContext<IServiceContainer>(defaultServiceContainer);