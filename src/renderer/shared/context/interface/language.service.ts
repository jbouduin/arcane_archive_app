import { ApiConfigurationDto } from "../../../../common/dto/infra/api-configuration.dto";
import { LanguageDto } from "../../dto/language.dto";

export interface ILanguageService {
  readonly allLanguages: Readonly<Array<LanguageDto>>;

  getLanguage(language: string): LanguageDto | undefined;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}
