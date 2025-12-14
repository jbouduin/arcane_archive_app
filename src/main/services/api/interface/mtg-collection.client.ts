import { ResultDto } from "../../../../common/dto/mtg-collection";
import { DiscoveryDto } from "../../../dto";

export interface IMtgCollectionClient {
  getData<T>(path: string): Promise<ResultDto<T>>;
  discover(): Promise<ResultDto<DiscoveryDto>>;
};
