import { LanguageDto } from "../../dto/language.dto";
import { ICollectionManagerProxyService } from "./collection-manager-proxy.service";

export interface ILanguageService {
  readonly allLanguages: Readonly<Array<LanguageDto>>;

  getLanguage(language: string): LanguageDto | undefined;
  initialize(collectionManagerProxy: ICollectionManagerProxyService): Promise<void>;
}
