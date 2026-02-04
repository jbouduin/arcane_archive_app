import { IBasicDataService, IMtgSetService } from "../../context";
import { CollectionCardListDto } from "../../dto";
import { AbstractCardListViewmodel } from "../abstract-card-list.viewmodel";

export class CollectionCardListViewmodel extends AbstractCardListViewmodel {
  //#region Public properties -------------------------------------------------
  public readonly language: string;//#endregion
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    basicDataService: IBasicDataService,
    mtgSetService: IMtgSetService,
    dto: CollectionCardListDto
  ) {
    super(basicDataService, mtgSetService, dto);
    this.language = basicDataService.getLanguage(dto.language)?.buttonText || "?";
  }
  //#endregion
}
