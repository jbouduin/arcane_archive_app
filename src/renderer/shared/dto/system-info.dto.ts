import { ArcaneArchiveServer } from "../../../common/types";
import { ApiInfoDto } from "./api-info.dto";

export type SystemInfoDto = {
  apiRoots: Map<ArcaneArchiveServer, string>;
  apiStatus: Map<ArcaneArchiveServer, ApiInfoDto | null>;
};
