import { IBasicDataService, ICollectionService, IMtgSetService } from "../../context";
import { CollectionCardListDto } from "../../dto";
import { AbstractCardListViewmodel } from "../abstract-card-list.viewmodel";

export class CollectionCardListViewmodel extends AbstractCardListViewmodel {
  //#region Public properties -------------------------------------------------
  public readonly language: string;
  public readonly quantity: number;
  public readonly collection: string;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService,
    dto: CollectionCardListDto
  ) {
    super(basicDataService, mtgSetService, dto);
    this.language = basicDataService.getLanguage(dto.language)?.buttonText || "?";
    this.quantity = dto.quantity;
    this.collection = collectionService.getCollectionById(dto.collectionId)?.code || "unknown";
  }
  //#endregion
}
