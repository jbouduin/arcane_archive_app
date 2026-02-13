import { ImportCollectionRequest } from "../../../../common/dto";
import { IResult } from "../../base";

export interface ICollectionService {
  importCollectionData(importCollectionData: ImportCollectionRequest): Promise<IResult<object>>;
}
