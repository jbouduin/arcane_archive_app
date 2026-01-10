import { useEffect, useState } from "react";
import { LoginResponseDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { SessionContext } from "../shared.context";
import { ProviderProps } from "./provider.props";

export function SessionProvider(props: ProviderProps) {
  // #region State ------------------------------------------------------------
  const sessionService = useServices().sessionService;
  const [loggedIn, setLoggedIn] = useState(sessionService.loggedIn);
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = sessionService.subscribeSessionChangeListener(
        (data: LoginResponseDto | null) => setLoggedIn(data != null)
      );
      return unsubscribe;
    },
    [sessionService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SessionContext.Provider value={{ loggedIn: loggedIn }}>
      {props.children}
    </SessionContext.Provider>
  );
  // #endregion
}
