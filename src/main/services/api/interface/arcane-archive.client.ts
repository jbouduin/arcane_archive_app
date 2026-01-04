import { ResultDto } from "../../../../common/dto";
import { DiscoveryDto } from "../../../dto";

export interface IArcaneArchiveClient {
  getData<T>(path: string): Promise<ResultDto<T>>;
  discover(): Promise<ResultDto<DiscoveryDto>>;
};
