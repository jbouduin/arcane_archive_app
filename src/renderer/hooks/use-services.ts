import React from "react";
import { ServiceContainerContext } from "../shared/context";

export const useServices = () => {
  const context = React.useContext(ServiceContainerContext);
  if (!context) throw new Error("ServiceContainer not available");
  return context;
};
