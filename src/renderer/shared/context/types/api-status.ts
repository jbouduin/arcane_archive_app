import { ArcanArchiveServer } from "../../../../common/types";
import { ApiInfoDto } from "../../dto";

export type ApiStatus = Map<ArcanArchiveServer, ApiInfoDto | null>;
