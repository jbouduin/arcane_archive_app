import { useContext } from "react";
import { SessionContext } from "../shared/context";

/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */
export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("Session context not available");
  return ctx;
};
