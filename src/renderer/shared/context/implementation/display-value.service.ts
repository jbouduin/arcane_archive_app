import { noop } from "lodash";
import { DISPLAY_VALUE_DICTIONARY_KEYS, DisplayValueDictionaryKey } from "../../types";
import { ICollectionManagerProxyService, IDisplayValueService } from "../interface";

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

  public initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void> {
    return collectionManagerProxy.getData("/dictionary")
      .then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => {
          const dictData = new Map<DisplayValueDictionaryKey, Map<string, string>>();
          DISPLAY_VALUE_DICTIONARY_KEYS.forEach((key) => {
            const entry = data[key];
            if (entry) {
              dictData.set(key, new Map(Object.entries(entry)));
            }
          });
          this.dictionary = dictData;
        },
        noop
      );
  }
  // #endregion
}
