import { AuditableDto, MasterDataDto } from "../../../common/dto";
import { CollectionType } from "../types";

export type CollectionDto = MasterDataDto<string> & AuditableDto & {
  parentId: number | null;
  type: CollectionType;
};
