import { MtgServer } from "../types";
import { ApiInfoDto } from "./api-info.dto";

export type SystemInfoDto = {
  apiRoots: Map<MtgServer, string>;
  apiStatus: Map<MtgServer, ApiInfoDto | null>;
};
