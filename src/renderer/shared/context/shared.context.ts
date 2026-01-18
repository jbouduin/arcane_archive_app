import { createContext } from "react";
import { ArcanArchiveServer } from "../../../common/types";
import { ApiInfoDto } from "../dto";
import { ServiceContainer } from "./implementation/service.container";
import { IServiceContainer } from "./interface";
import { ApiInfoContextType, PreferencesContextType, SessionContextType } from "./types";

export const ApiStatusContext = createContext<ApiInfoContextType>(
  {
    apiStatus: new Map<ArcanArchiveServer, ApiInfoDto | null>(),
    apiRoots: new Map<ArcanArchiveServer, string>(),
    authenticationServiceAvailable: false,
    libraryServiceAvailable: false,
    collectionServiceAvailable: false,
    deckServiceAvailable: false
  }
);
export const ServiceContainerContext = createContext<IServiceContainer>(new ServiceContainer());
export const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);
