import { AuditableDto, MasterDataDto } from "../../../common/dto";

export type CollectionDto = MasterDataDto<string> & AuditableDto & {
  parentId: number | null;
  folder: boolean;
};
