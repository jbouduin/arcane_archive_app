import { useCallback, useEffect, useState } from "react";
import { useServices } from "../../../hooks";
import { SessionContext } from "../shared.context";
import { SessionChangeEvent, SessionContextType } from "../types";
import { SessionProviderProps } from "./session-provider.props";

export function SessionProvider(props: SessionProviderProps): JSX.Element {
  //#region Memoization -------------------------------------------------------
  const loginResponseToSessionContext = useCallback(
    (event: SessionChangeEvent | null) => {
      let context: SessionContextType;
      if (event != null) {
        context = {
          email: event.profile.email,
          isAppAdmin: event.roles.has("ROLE_APP_ADMIN"),
          isSysAdmin: event.roles.has("ROLE_SYS_ADMIN"),
          loggedIn: true,
          userName: event.userName
        };
      } else {
        context = { isAppAdmin: false, isSysAdmin: false, loggedIn: false };
      }
      return context;
    },
    []
  );
  //#endregion

  //#region State -------------------------------------------------------------
  const sessionService = useServices().sessionService;
  const [session, setSession] = useState<SessionContextType>(loginResponseToSessionContext(props.sessionData));
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = sessionService.subscribeSessionChangeListener(
        (data: SessionChangeEvent | null) => setSession(
          loginResponseToSessionContext(data)
        )
      );
      return unsubscribe;
    },
    [sessionService]
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
  //#endregion
}
