import { DisplayValueDictionaryKey, SelectOption } from "../../types";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";

export interface IDisplayValueService {
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void>;
}
