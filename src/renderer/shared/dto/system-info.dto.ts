import { ArcanArchiveServer } from "../../../common/types";
import { ApiInfoDto } from "./api-info.dto";

export type SystemInfoDto = {
  apiRoots: Map<ArcanArchiveServer, string>;
  apiStatus: Map<ArcanArchiveServer, ApiInfoDto | null>;
};
