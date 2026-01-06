import { MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetTreeDto>;

  getSelectOptions(): Array<SelectOption<MtgSetTreeDto>>;
  getSetById(id: number): MtgSetTreeDto | undefined;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void>;
}
