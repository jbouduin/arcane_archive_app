import { ApiConfigurationDto } from "../../../../common/dto/infra/api-configuration.dto";
import { LanguageDto } from "../../dto/language.dto";

export interface ILanguageService {
  readonly languages: Readonly<Map<string, LanguageDto>>;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}