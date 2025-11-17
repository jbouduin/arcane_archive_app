import { MtgSetDto } from "../../dto";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetDto>;

  getSetById(id: number): MtgSetDto | undefined;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
