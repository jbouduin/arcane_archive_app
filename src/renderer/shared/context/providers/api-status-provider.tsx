import { useEffect, useState } from "react";
import { useServices } from "../../../hooks";
import { ApiInfoDto } from "../../dto";
import { MtgServer } from "../../types";
import { ApiStatusContext } from "../shared.context";
import { ProviderProps } from "./provider.props";

export function ApiStatusProvider(props: ProviderProps) {
  // #region State ------------------------------------------------------------
  const proxyService = useServices().arcaneArchiveProxy;
  const [apiStatus, setApiStatus] = useState(proxyService.apiStatus);
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = proxyService.subscribeApiStatusChangeListener(
        (status: Map<MtgServer, ApiInfoDto | null>) => setApiStatus(new Map(status))
      );
      return unsubscribe;
    },
    [proxyService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ApiStatusContext.Provider
      value={{
        authenticationServiceAvailable: apiStatus.get("authentication") != null,
        libraryServiceAvailable: apiStatus.get("library") != null,
        collectionServiceAvailable: apiStatus.get("collection") != null,
        deckServiceAvailable: apiStatus.get("deck") != null
      }}
    >
      {props.children}
    </ApiStatusContext.Provider>
  );
  // #endregion
}
