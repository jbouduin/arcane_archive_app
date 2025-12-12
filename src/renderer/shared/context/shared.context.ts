import React from "react";
import { ServiceContainer } from "./implementation/service.container";
import { IPreferencesContextType, IServiceContainer } from "./interface";
import { ISessionContextType } from "./interface/session-context-type";

export const ServiceContainerContext = React.createContext<IServiceContainer>(new ServiceContainer());
export const SessionContext = React.createContext<ISessionContextType | undefined>(undefined);
export const PreferencesContext = React.createContext<IPreferencesContextType | undefined>(undefined);
