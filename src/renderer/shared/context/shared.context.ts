import { createContext } from "react";
import { ArcaneArchiveServer } from "../../../common/types";
import { ApiInfoDto } from "../dto";
import { IServiceContainer } from "./interface";
import { ApiInfoContextType, PreferencesContextType, SessionContextType } from "./types";

export const ApiStatusContext = createContext<ApiInfoContextType>(
  {
    apiStatus: new Map<ArcaneArchiveServer, ApiInfoDto | null>(),
    apiRoots: new Map<ArcaneArchiveServer, string>(),
    authenticationServiceAvailable: false,
    libraryServiceAvailable: false,
    collectionServiceAvailable: false,
    deckServiceAvailable: false
  }
);
export const ServiceContainerContext = createContext<IServiceContainer | undefined>(undefined);
export const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);
