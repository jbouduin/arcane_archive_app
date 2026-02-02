import { ImportCollectionDataDto } from "../../../../common/dto/collection";
import { IResult } from "../../base";

export interface ICollectionService {
  importCollectionData(importCollectionData: ImportCollectionDataDto): Promise<IResult<object>>;
}
