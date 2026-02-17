import { useContext } from "react";
import { ApiStatusContext } from "../shared/context";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (!context) throw new Error("ApiStatusContext not available");
  return context;
};
