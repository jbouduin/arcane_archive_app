import { useCallback, useEffect, useState } from "react";
import { SessionDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { SessionContext } from "../shared.context";
import { SessionContextType } from "../types";
import { SessionProviderProps } from "./session-provider.props";

export function SessionProvider(props: SessionProviderProps): JSX.Element {
  //#region Memoization -------------------------------------------------------
  const loginResponseToSessionContext = useCallback(
    (loginResponse: SessionDto | null) => {
      if (loginResponse != null) {
        return { loggedIn: true, email: loginResponse.profile.email, userName: loginResponse.userName };
      } else {
        return { loggedIn: false };
      }
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
        (data: SessionDto | null) => setSession(
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
