import { CollectionDto, MtgSetDto, MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetTreeDto>;

  exportToExcel(id: number, collections: Array<CollectionDto>): void;
  getSelectOptions(): Array<SelectOption<MtgSetTreeDto>>;
  getSetDetails(id: number): Promise<MtgSetDto>;
  getSetTreeDtoById(id: number): MtgSetTreeDto | undefined;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
  synchronizeSet(setCode: string): Promise<void>;
}
