import { MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetTreeDto>;

  getSelectOptions(): Array<SelectOption<MtgSetTreeDto>>;
  getSetById(id: number): MtgSetTreeDto | undefined;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
