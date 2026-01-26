import { useEffect, useState } from "react";
import { ArcanArchiveServer } from "../../../../common/types";
import { useServices } from "../../../hooks";
import { ApiStatusContext } from "../shared.context";
import { ApiStatus } from "../types";
import { ApiInfoProviderProps } from "./api-info-provider.props";

export function ApiInfoProvider(props: ApiInfoProviderProps): JSX.Element {
  //#region State -------------------------------------------------------------
  const { arcaneArchiveProxy } = useServices();
  const [apiStatus, setApiStatus] = useState(props.apiStatus);
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = arcaneArchiveProxy.subscribeApiStatusChangeListener(
        (status: ApiStatus) => setApiStatus(new Map(status))
      );
      void arcaneArchiveProxy.startRefreshing();
      return unsubscribe;
    },
    [arcaneArchiveProxy]
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <ApiStatusContext.Provider
      value={{
        apiRoots: new Map<ArcanArchiveServer, string>([
          ["authentication", props.apiConfiguration.authenticationApiRoot],
          ["library", props.apiConfiguration.libraryApiRoot],
          ["collection", props.apiConfiguration.collectionApiRoot],
          ["deck", props.apiConfiguration.deckApiRoot]
        ]),
        apiStatus: apiStatus,
        authenticationServiceAvailable: apiStatus.get("authentication") != null,
        libraryServiceAvailable: apiStatus.get("library") != null,
        collectionServiceAvailable: apiStatus.get("collection") != null,
        deckServiceAvailable: apiStatus.get("deck") != null
      }}
    >
      {props.children}
    </ApiStatusContext.Provider>
  );
  //#endregion
}
