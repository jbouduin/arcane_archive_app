import { IBasicDataService, IMtgSetService } from "../../context";
import { LanguageDto, LibraryCardListDto } from "../../dto";
import { AbstractCardListViewmodel } from "../abstract-card-list.viewmodel";

export class LibraryCardListViewmodel extends AbstractCardListViewmodel {
  private readonly _dto: LibraryCardListDto;
  //#region Public properties -------------------------------------------------
  public readonly languages: string;
  public get languageArray(): Array<string> {
    return this._dto.languages;
  }

  public get dto(): LibraryCardListDto {
    return this._dto;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(basicDataService: IBasicDataService, mtgSetService: IMtgSetService, dto: LibraryCardListDto) {
    super(basicDataService, mtgSetService, dto);
    this._dto = dto;

    this.languages = dto.languages
      .map((lng: string) => basicDataService.getLanguage(lng))
      .filter((lng: LanguageDto | undefined) => lng != undefined)
      .sort((a: LanguageDto, b: LanguageDto) => a.sequence - b.sequence)
      .map((lng: LanguageDto) => lng.buttonText)
      .join(", ");
  }
  // #endregion
}
