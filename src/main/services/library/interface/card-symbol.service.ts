import { ProgressCallback } from "../../../../common/ipc";
import { IResult } from "../../base";

export interface ICardSymbolService {
  getCardSymbolSvg(): Promise<IResult<Map<string, string>>>;
  cacheImages(callBack: ProgressCallback): Promise<void>;
};
