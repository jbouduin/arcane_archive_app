import { noop } from "lodash";
import { LanguageDto } from "../../dto";
import { IArcaneArchiveProxy, ILanguageService } from "../interface";

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

  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void> {
    return arcaneArchiveProxy.getData<Array<LanguageDto>>("library", "/public/languages/mtg")
      .then(
        (allLanguages: Array<LanguageDto>) => allLanguages
          .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
          .forEach((language: LanguageDto) => this.languageMap.set(language.language, language)),
        noop
      );
  }
  // #endregion
}
