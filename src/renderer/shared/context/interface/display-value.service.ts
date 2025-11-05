import { ApiConfigurationDto } from "../../../../common/dto/infra/api-configuration.dto";
import { DisplayValueDictionaryKey } from "../../types";

export interface IDisplayValueService {
  getDisplayValue(key: DisplayValueDictionaryKey, value: string): string;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}
