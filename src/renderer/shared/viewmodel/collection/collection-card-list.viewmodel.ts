import { IColorService, IDisplayValueService, ILanguageService, IMtgSetService } from "../../context";
import { CollectionCardListDto } from "../../dto";
import { AbstractCardListViewmodel } from "../abstract-card-list.viewmodel";

export class CollectionCardListViewmodel extends AbstractCardListViewmodel {
  //#region Public properties -------------------------------------------------
  public readonly language: string;//#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    colorService: IColorService,
    displayValueService: IDisplayValueService,
    languageService: ILanguageService,
    mtgSetService: IMtgSetService,
    dto: CollectionCardListDto) {
    super(colorService, displayValueService, mtgSetService, dto);
    this.language = languageService.getLanguage(dto.language)?.buttonText || "?";
  }
  //#endregion
}
