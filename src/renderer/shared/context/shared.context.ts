import React from "react";
import { ServiceContainer } from "./implementation/service.container";
import { IServiceContainer } from "./interface";

export const ServiceContainerContext = React.createContext<IServiceContainer>(new ServiceContainer());
