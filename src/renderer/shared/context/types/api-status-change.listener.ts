import { ApiInfoDto } from "../../dto";
import { MtgServer } from "../../types";

export type ApiStatusChangeListener = (status: Map<MtgServer, ApiInfoDto | null>) => void;
