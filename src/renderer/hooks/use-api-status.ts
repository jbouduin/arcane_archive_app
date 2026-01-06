import { useContext } from "react";
import { ApiStatusContext } from "../shared/context";

export const useApiStatus = () => {
  const context = useContext(ApiStatusContext);
  if (!context) throw new Error("ApiStatusContext not available");
  return context;
};
