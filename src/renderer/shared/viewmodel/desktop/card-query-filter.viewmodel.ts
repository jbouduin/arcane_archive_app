import { IBasicDataService, ICollectionService, IMtgSetService } from "../../context";
import { CardQueryFilterDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

export class CardQueryFilterViewmodel extends BaseViewmodel<CardQueryFilterDto> {
  //#region public properties -------------------------------------------------
  public readonly useCollections: boolean;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: CardQueryFilterDto,
    useCollections: boolean,
    basicDataService: IBasicDataService,
    collectionService: ICollectionService,
    mtgSetService: IMtgSetService
  ) {
    super(dto, "update");
    this.useCollections = useCollections;
    if (useCollections) {
      this.registerSelectOptions("collectionIds", collectionService.getSelectOptions());
    }
    this.registerSelectOptions("cardSetIds", mtgSetService.getSelectOptions());
    this.registerSelectOptions("cardColors", basicDataService.getColorSelectOptions());
    this.registerSelectOptions("identityColors", basicDataService.getColorSelectOptions());
    this.registerSelectOptions("producedManaColors", basicDataService.getColorSelectOptions());
    this.registerSelectOptions("rarities", basicDataService.getSelectOptions("rarity"));
    this.registerSelectOptions("gameFormats", basicDataService.getSelectOptions("gameFormat"));
    this.registerSelectOptions("superTypes", basicDataService.getSelectOptions("superType"));
    this.registerSelectOptions("types", basicDataService.getSelectOptions("cardType"));
    this.registerSelectOptions("powers", basicDataService.getSelectOptions("powerValues"));
    this.registerSelectOptions("toughnesses", basicDataService.getSelectOptions("thoughnessValues"));
  }
  //#endregion
}
