import { useContext } from "react";
import { SessionContext } from "../shared/context";

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("Session context not available");
  return ctx;
};
