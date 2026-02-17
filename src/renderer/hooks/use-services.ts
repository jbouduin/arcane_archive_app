import React from "react";
import { ServiceContainerContext } from "../shared/context";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
export const useServices = () => {
  const context = React.useContext(ServiceContainerContext);
  if (!context) throw new Error("ServiceContainer not available");
  return context;
};
