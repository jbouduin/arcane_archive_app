import { ApiConfigurationDto } from "../../../../common/dto/infra";
import { ResultDto } from "../../../../common/dto/mtg-collection";
import { LanguageDto } from "../../dto";
import { ILanguageService } from "../interface";

export class LanguageService implements ILanguageService {
  // #region private fields ---------------------------------------------------
  private languageMap: Map<string, LanguageDto>;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.languageMap = new Map<string, LanguageDto>();
  }
  // #endregion

  // #region ILanguageService Members -----------------------------------------
  public get allLanguages(): Readonly<Array<LanguageDto>> {
    return Array.of(...this.languageMap.values());
  }

  public getLanguage(language: string): LanguageDto | undefined {
    return this.languageMap.get(language)!;
  }

  public async initialize(apiConfiguration: ApiConfigurationDto): Promise<void> {
    const response = await fetch(apiConfiguration.mtgCollectionApiRoot + "/languages/mtg");
    const allLanguages: ResultDto<Array<LanguageDto>> = (await response.json()) as ResultDto<Array<LanguageDto>>;
    allLanguages
      .data
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
      .forEach((language: LanguageDto) => this.languageMap.set(language.language, language));
  }
  // #endregion
}
