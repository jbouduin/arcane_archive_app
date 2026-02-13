import { IBasicDataService, ICollectionService, IMtgSetService } from "../../../context";
import {
  CardDetailDto, CardQueryFilterDto, CollectionCardListDto, LibraryCardListDto, LibraryRulingDto
} from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import {
  AdvancedCardSearchViewmodel,
  CardDetailViewmodel, LibraryCardListViewmodel, LibraryRulingViewmodel
} from "../../mtg-card";
import { IMtgCardViewmodelFactory } from "../interface";

export class MtgCardViewmodelFactory implements IMtgCardViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly basicDataService: IBasicDataService;
  private readonly collectionService: ICollectionService;
  private readonly mtgSetService: IMtgSetService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(
    basicDataService: IBasicDataService, collectionService: ICollectionService, mtgSetService: IMtgSetService
  ) {
    this.basicDataService = basicDataService;
    this.collectionService = collectionService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion

  // #region IMtgCardViewmodelFactory Members ---------------------------------
  public getCardDetailViewmodel(cardDetail: CardDetailDto): CardDetailViewmodel {
    return new CardDetailViewmodel(this.basicDataService, this.mtgSetService, cardDetail);
  }

  public getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel {
    return new LibraryCardListViewmodel(this.basicDataService, this.mtgSetService, dto);
  }

  public getRulingsViewmodel(rulings: Array<LibraryRulingDto>): Array<LibraryRulingViewmodel> {
    return rulings
      .map((dto: LibraryRulingDto) => new LibraryRulingViewmodel(dto))
      .sort((a: LibraryRulingViewmodel, b: LibraryRulingViewmodel) =>
        b.publishedAtDate.getTime() - a.publishedAtDate.getTime()
      );
  }

  public getAdvancedCardSearchViewmodel(
    queryFilter: CardQueryFilterDto, useCollections: boolean
  ): AdvancedCardSearchViewmodel {
    return new AdvancedCardSearchViewmodel(
      queryFilter, useCollections, this.basicDataService, this.collectionService, this.mtgSetService
    );
  }

  public getCollectionCardlistViewmodel(dto: CollectionCardListDto): CollectionCardListViewmodel {
    return new CollectionCardListViewmodel(this.basicDataService, this.collectionService, this.mtgSetService, dto);
  }
  // #endregion
}
