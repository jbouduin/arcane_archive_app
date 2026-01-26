import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../context";
import { LanguageDto, LibraryCardListDto } from "../../dto";
import { AbstractCardListViewmodel } from "../abstract-card-list.viewmodel";

export class LibraryCardListViewmodel extends AbstractCardListViewmodel {
  //#region Public properties -------------------------------------------------
  public readonly languages: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService,
    dto: LibraryCardListDto) {
    super(colorService, displayValueService, mtgSetService, dto);
    this.languages = dto.languages
      .map((lng: string) => languageService.getLanguage(lng))
      .filter((lng: LanguageDto | undefined) => lng != undefined)
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
      .map((lng: LanguageDto) => lng.buttonText)
      .join(", ");
  }
  // #endregion
}
