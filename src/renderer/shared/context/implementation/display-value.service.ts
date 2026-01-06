import { noop } from "lodash";
import { DISPLAY_VALUE_DICTIONARY_KEYS, DisplayValueDictionaryKey, SelectOption } from "../../types";
import { IArcaneArchiveProxyService, IDisplayValueService } from "../interface";

export class DisplayValueService implements IDisplayValueService {
  // #region private fields ---------------------------------------------------
  private dictionary: Map<DisplayValueDictionaryKey, Map<string, string>>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.dictionary = new Map<DisplayValueDictionaryKey, Map<string, string>>();
  }
  // #endregion

  // #region IDisplayValueService Members -------------------------------------
  public getDisplayValue(key: DisplayValueDictionaryKey, value: string): string {
    let result: string | undefined;
    const values: Map<string, string> | undefined = this.dictionary.get(key);
    if (values) {
      result = values.get(value);
    }
    return result || "[" + value + "]";
  }

  public getSelectOptions(key: DisplayValueDictionaryKey): Array<SelectOption<string>> {
    const result: Array<SelectOption<string>> = new Array<SelectOption<string>>();
    this.dictionary.get(key)?.forEach((value: string, key: string) => result.push({ label: value, value: key }));
    return result;
  }

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void> {
    return arcaneArchiveProxy.getData("library", "/public/dictionary")
      .then(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          const dictData = new Map<DisplayValueDictionaryKey, Map<string, string>>();
          DISPLAY_VALUE_DICTIONARY_KEYS.forEach((key) => {
            const entry = data[key];
            if (entry) {
              // --- sort by display value ---
              const asArray = Object.entries<string>(entry).sort((a, b) => a[1].localeCompare(b[1]));
              dictData.set(key, new Map(asArray));
            }
          });
          this.dictionary = dictData;
        },
        noop
      );
  }
  // #endregion
}
