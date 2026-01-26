import { noop } from "lodash";
import { DISPLAY_VALUE_DICTIONARY_KEYS, DisplayValueDictionaryKey, EnumDisplayValueDictionaryKey, SelectOption } from "../../types";
import { IArcaneArchiveProxy, IDisplayValueService } from "../interface";

export class DisplayValueService implements IDisplayValueService {
  // #region private fields ---------------------------------------------------
  private dictionary: Map<DisplayValueDictionaryKey, Map<string, string>>;
  private selectOptions: Map<DisplayValueDictionaryKey, Array<SelectOption<string>>>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.dictionary = new Map<DisplayValueDictionaryKey, Map<string, string>>();
    this.selectOptions = new Map<DisplayValueDictionaryKey, Array<SelectOption<string>>>();
  }
  // #endregion

  // #region IDisplayValueService Members -------------------------------------
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
    return Promise.all([
      arcaneArchiveProxy.getData<Array<string>>("library", "/public/card-super-type"),
      arcaneArchiveProxy.getData<Array<string>>("library", "/public/card-type"),
      arcaneArchiveProxy.getData<Array<string>>("library", "/public/catalog/POWERS/item"),
      arcaneArchiveProxy.getData<Array<string>>("library", "/public/catalog/TOUGHNESSES/item"),
      arcaneArchiveProxy.getData("library", "/public/dictionary")
    ]).then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: [Array<string>, Array<string>, Array<string>, Array<string>, any]) => {
        this.processCatalog("superType", r[0]);
        this.processCatalog("cardType", r[1]);
        this.processCatalog("powerValues", r[2]);
        this.processCatalog("thoughnessValues", r[3]);
        this.processEnumValues(r[4]);
      },
      noop
    );
  }
  // #endregion

  //#region Auxiliary Methods -------------------------------------------------
  private processCatalog(key: DisplayValueDictionaryKey, values: Array<string>): void {
    this.selectOptions.set(key, values.sort().map((s: string) => ({ label: s, value: s })));
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
  //#endregion
}
