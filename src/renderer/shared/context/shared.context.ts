import { createContext } from "react";
import { ServiceContainer } from "./implementation/service.container";
import { ApiStatusContextType, IPreferencesContextType, IServiceContainer } from "./interface";
import { ISessionContextType } from "./interface/session-context-type";

export const ApiStatusContext = createContext<ApiStatusContextType>(
  {
    authenticationServiceAvailable: false,
    libraryServiceAvailable: false,
    collectionServiceAvailable: false,
    deckServiceAvailable: false
  }
);
export const ServiceContainerContext = createContext<IServiceContainer>(new ServiceContainer());
export const SessionContext = createContext<ISessionContextType | undefined>(undefined);
export const PreferencesContext = createContext<IPreferencesContextType | undefined>(undefined);
