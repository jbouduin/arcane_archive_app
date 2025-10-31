import { IResult } from "../../base";

export interface IAssetService {
  getAsset(path: string): Promise<IResult<string>>;
}