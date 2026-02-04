import { AppColorDto, LanguageDto } from "../../dto";
import { CardConditionDto } from "../../dto/card-condition.dto";
import { DisplayValueDictionaryKey, SelectOption } from "../../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface IBasicDataService {
  getCardConditionSelectOptions(): Array<SelectOption<CardConditionDto>>;
  getColor(colorCode: string): AppColorDto | undefined;
  getColorSelectOptions(): Array<SelectOption<AppColorDto>>;
  getLanguage(language: string): LanguageDto | undefined;
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>>;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
}
