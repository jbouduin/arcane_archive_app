import { MtgSetDto } from "../../dto";
import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetDto>;

  getSelectOptions(): Array<SelectOption<MtgSetDto>>;
  getSetById(id: number): MtgSetDto | undefined;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
