import { ResultDto } from "../../../../common/dto/mtg-collection";

export interface IMtgCollectionClient {
  getData<T>(path: string): Promise<ResultDto<T>>;
};
