import { useEffect, useState } from "react";
import { LoginResponseDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { SessionContext } from "../shared.context";
import { ProviderProps } from "./provider.props";
import { SessionContextType } from "../types";

export function SessionProvider(props: ProviderProps) {
  // #region State ------------------------------------------------------------
  const initialSessionContext: SessionContextType = { loggedIn: false };
  const sessionService = useServices().sessionService;
  const [session, setSession] = useState<SessionContextType>(initialSessionContext);
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = sessionService.subscribeSessionChangeListener(
        (data: LoginResponseDto | null, userName: string | null) => setSession(
          data != null && userName != null
            ? { loggedIn: true, email: data.profile.email, userName: userName }
            : initialSessionContext
        )
      );
      return unsubscribe;
    },
    [sessionService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SessionContext.Provider value={session}>
      {props.children}
    </SessionContext.Provider>
  );
  // #endregion
}
