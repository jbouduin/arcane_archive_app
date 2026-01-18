import { LanguageDto } from "../../dto/language.dto";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ILanguageService {
  readonly allLanguages: Readonly<Array<LanguageDto>>;

  getLanguage(language: string): LanguageDto | undefined;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): Promise<void>;
}
