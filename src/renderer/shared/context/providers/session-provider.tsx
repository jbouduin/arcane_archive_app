import { useEffect, useState } from "react";
import { useServices } from "../../../hooks/use-services";
import { SessionContext } from "../shared.context";

export function SessionProvider({ children }: { children: React.ReactNode; }) {
  // #region State ------------------------------------------------------------
  const sessionService = useServices().sessionService;
  const [loggedIn, setLoggedIn] = useState(sessionService.loggedIn);
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = sessionService.subscribe(() => {
        setLoggedIn(sessionService.loggedIn);
      });
      return unsubscribe;
    },
    [sessionService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SessionContext.Provider value={{ loggedIn: loggedIn }}>
      {children}
    </SessionContext.Provider>
  );
  // #endregion
}
