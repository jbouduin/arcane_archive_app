import { createContext } from "react";
import { ServiceContainer } from "./implementation/service.container";
import { IServiceContainer } from "./interface";
import { ApiStatusContextType, PreferencesContextType, SessionContextType } from "./types";

export const ApiStatusContext = createContext<ApiStatusContextType>(
  {
    authenticationServiceAvailable: false,
    libraryServiceAvailable: false,
    collectionServiceAvailable: false,
    deckServiceAvailable: false
  }
);
export const ServiceContainerContext = createContext<IServiceContainer>(new ServiceContainer());
export const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);
