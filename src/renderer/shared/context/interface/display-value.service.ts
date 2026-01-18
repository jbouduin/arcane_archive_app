import { DisplayValueDictionaryKey, SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IDisplayValueService {
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
}
