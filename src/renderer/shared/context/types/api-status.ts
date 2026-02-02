import { ArcaneArchiveServer } from "../../../../common/types";
import { ApiInfoDto } from "../../dto";

export type ApiStatus = Map<ArcaneArchiveServer, ApiInfoDto | null>;
