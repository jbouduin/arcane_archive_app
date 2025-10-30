import { ApiConfigurationDto } from "../../../../common/dto/infra";
import { DISPLAY_VALUE_DICTIONARY_KEYS, DisplayValueDictionaryKey, ResultDto } from "../../dto";
import { IDisplayValueService } from "../interface";

export class DisplayValueService implements IDisplayValueService {  
  //#region Private fields ----------------------------------------------------
  private dictionary: Map<DisplayValueDictionaryKey, Map<string, string>>;  
  //#endregion

  //#region Constructor -------------------------------------------------------
  public constructor() {
    this.dictionary = new Map<DisplayValueDictionaryKey, Map<string, string>>;
  }
  //#endregion

  //#region IDisplayValueService Members --------------------------------------
  public getDisplayValue(key: DisplayValueDictionaryKey, value: string): string {
    let result: string | undefined;
    const values: Map<string, string> | undefined = this.dictionary.get(key);
    if (values) {
      result = values.get(value);
    }
    return result || "[" + value + "]";
  }

  public initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    return fetch(apiConfiguration.mtgCollectionApiRoot + "/dictionary")
      .then(
        async (response: Response) => {
          const rawData = await response.json();
          const dictData = new Map<DisplayValueDictionaryKey, Map<string, string>>();

          DISPLAY_VALUE_DICTIONARY_KEYS.forEach((key) => {
            const entry = rawData.data[key];
            if (entry) {
              dictData.set(key, new Map(Object.entries(entry)));
            }
          });
          this.dictionary = dictData;
        }
      );
  }
  //#endregion
}