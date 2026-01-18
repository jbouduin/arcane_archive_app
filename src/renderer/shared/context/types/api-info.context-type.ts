import { ArcanArchiveServer } from "../../../../common/types";
import { ApiStatus } from "./api-status";

export type ApiInfoContextType = {
  apiStatus: ApiStatus;
  apiRoots: Map<ArcanArchiveServer, string>;
  authenticationServiceAvailable: boolean;
  libraryServiceAvailable: boolean;
  collectionServiceAvailable: boolean;
  deckServiceAvailable: boolean;
};
