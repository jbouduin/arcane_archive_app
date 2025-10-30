import React from "react";
import { IServiceContainer } from "./interface";
import { ConfigurationService } from "./implementation/configuration.service";

const defaultServiceContainer: IServiceContainer = {
  configurationService: new ConfigurationService(),
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
  }
};

export const ServiceContainerContext = React.createContext<IServiceContainer>(defaultServiceContainer);