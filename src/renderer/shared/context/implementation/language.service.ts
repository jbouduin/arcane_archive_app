import { ApiConfigurationDto } from "../../../../common/dto/infra";
import { LanguageDto, ResultDto } from "../../dto";
import { ILanguageService } from "../interface";

export class LanguageService implements ILanguageService {
  // #region private fields ---------------------------------------------------
  private _languages: Map<string, LanguageDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._languages = new Map<string, LanguageDto>();
  }
  // #endregion

  // #region ILanguageService Members -----------------------------------------
  public get languages(): Readonly<Map<string, LanguageDto>> {
    return this._languages;
  }

  public initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    return fetch(apiConfiguration.mtgCollectionApiRoot + "/languages/mtg")
      .then(
        async (response: Response) => {
          const allLanguages: ResultDto<Array<LanguageDto>> = (await response.json()) as ResultDto<Array<LanguageDto>>;
          allLanguages
            .data
            .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
            .forEach((language: LanguageDto) => this._languages.set(language.language, language));
        }
      );
  }
  // #endregion
}
