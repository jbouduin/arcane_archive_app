import { ArcaneArchiveServer } from "../../../../common/types";
import { ApiStatus } from "./api-status";

export type ApiInfoContextType = {
  apiStatus: ApiStatus;
  apiRoots: Map<ArcaneArchiveServer, string>;
  authenticationServiceAvailable: boolean;
  libraryServiceAvailable: boolean;
  collectionServiceAvailable: boolean;
  deckServiceAvailable: boolean;
};
