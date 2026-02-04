import { noop } from "lodash";
import { AppColorDto, AppDataResponse, LanguageDto } from "../../dto";
import { CardConditionDto } from "../../dto/card-condition.dto";
import {
  DISPLAY_VALUE_DICTIONARY_KEYS, DisplayValueDictionaryKey, EnumDisplayValueDictionaryKey, SelectOption
} from "../../types";
import { IArcaneArchiveProxy, IBasicDataService } from "../interface";

export class BasicDataService implements IBasicDataService {
  // #region private fields ---------------------------------------------------
  private cardConditionSelectOptions: Array<SelectOption<CardConditionDto>>;
  private dictionary: Map<DisplayValueDictionaryKey, Map<string, string>>;
  private selectOptions: Map<DisplayValueDictionaryKey, Array<SelectOption<string>>>;
  private languageMap: Map<string, LanguageDto>;
  private colorMap: Map<string, AppColorDto>;
  private colorSelectOptions: Array<SelectOption<AppColorDto>>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.cardConditionSelectOptions = new Array<SelectOption<CardConditionDto>>();
    this.colorMap = new Map<string, AppColorDto>();
    this.dictionary = new Map<DisplayValueDictionaryKey, Map<string, string>>();
    this.selectOptions = new Map<DisplayValueDictionaryKey, Array<SelectOption<string>>>();
    this.colorSelectOptions = new Array<SelectOption<AppColorDto>>();
    this.languageMap = new Map<string, LanguageDto>();
  }
  // #endregion

  // #region IDisplayValueService Members -------------------------------------
  public getCardConditionSelectOptions(): Array<SelectOption<CardConditionDto>> {
    return this.cardConditionSelectOptions;
  }

  public getColor(colorCode: string): AppColorDto | undefined {
    return this.colorMap.get(colorCode);
  }

  public getColorSelectOptions(): Array<SelectOption<AppColorDto>> {
    return this.colorSelectOptions;
  }

  public getLanguage(language: string): LanguageDto | undefined {
    return this.languageMap.get(language)!;
  }

  public getDisplayValue(key: EnumDisplayValueDictionaryKey, value: string): string {
    let result: string | undefined;
    const values: Map<string, string> | undefined = this.dictionary.get(key);
    if (values) {
      result = values.get(value);
    }
    return result || "[" + value + "]";
  }

  public getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>> {
    return this.selectOptions.get(key) || new Array<SelectOption<string>>();
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void> {
    return arcaneArchiveProxy.getData<AppDataResponse>("library", "/public/basic-data")
      .then(
        (response: AppDataResponse) => {
          this.processCardConditions(response.cardConditions);
          this.processCatalog("superType", response.cardSuperTypes);
          this.processCatalog("cardType", response.cardTypes);
          this.processColors(response.colors);
          this.processEnumValues(response.dictionaries);
          this.processLanguages(response.mtgLanguages);
          this.processCatalog("powerValues", response.powers);
          this.processCatalog("thoughnessValues", response.toughnesses);
        },
        noop
      );
  }
  // #endregion

  //#region Auxiliary Methods -------------------------------------------------
  private processCardConditions(allConditions: Array<CardConditionDto>): void {
    allConditions
      .sort((a: CardConditionDto, b: CardConditionDto) => a.sequence - b.sequence)
      .forEach((cardCondition: CardConditionDto) =>
        this.cardConditionSelectOptions.push({ label: cardCondition.displayValue, value: cardCondition })
      );
  }

  private processCatalog(key: DisplayValueDictionaryKey, values: Array<string>): void {
    this.selectOptions.set(key, values.sort().map((s: string) => ({ label: s, value: s })));
  }

  private processColors(allColors: Array<AppColorDto>): void {
    allColors
      .sort((a: AppColorDto, b: AppColorDto) => a.sequence - b.sequence)
      .forEach((color: AppColorDto) => {
        this.colorMap.set(color.code, color);
        this.colorSelectOptions.push({ label: color.name, value: color });
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private processEnumValues(data: any): void {
    // const dictData = new Map<EnumDisplayValueDictionaryKey, Map<string, string>>();
    DISPLAY_VALUE_DICTIONARY_KEYS.forEach((key) => {
      const entry = data[key];
      if (entry) {
        // --- sort by display value ---
        const asArray = Object.entries<string>(entry).sort((a, b) => a[1].localeCompare(b[1]));
        const asMap: Map<string, string> = new Map(asArray);
        const asSelectOptionArray = new Array<SelectOption<string>>();
        asMap.forEach((value: string, key: string) => asSelectOptionArray.push({ label: value, value: key }));
        this.dictionary.set(key, asMap);
        this.selectOptions.set(key, asSelectOptionArray);
      }
    });
  }

  private processLanguages(allLanguages: Array<LanguageDto>): void {
    allLanguages
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
      .forEach((language: LanguageDto) => this.languageMap.set(language.language, language));
  }
  //#endregion
}
