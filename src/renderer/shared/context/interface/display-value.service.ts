import { DisplayValueDictionaryKey, SelectOption } from "../../types";
import { ICollectionManagerProxyService } from "./collection-manage-proxy.service";

export interface IDisplayValueService {
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>>;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
