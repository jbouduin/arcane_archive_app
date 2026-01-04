import { LanguageDto } from "../../dto/language.dto";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";

export interface ILanguageService {
  readonly allLanguages: Readonly<Array<LanguageDto>>;

  getLanguage(language: string): LanguageDto | undefined;
  initialize(arcaneArchiveProxy: IArcaneArchiveProxyService): Promise<void>;
}
