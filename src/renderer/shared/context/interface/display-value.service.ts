import { DisplayValueDictionaryKey } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IDisplayValueService {
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
