import { MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetTreeDto>;

  getSelectOptions(): Array<SelectOption<MtgSetTreeDto>>;
  getSetById(id: number): MtgSetTreeDto | undefined;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
}
