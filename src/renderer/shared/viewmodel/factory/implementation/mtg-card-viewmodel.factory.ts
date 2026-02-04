import { IArcaneArchiveProxy, IBasicDataService, IMtgSetService, IServiceContainer } from "../../../context";
import {
  AdvancedCardSearchDto, CollectionCardListDto, LibraryCardDto, LibraryCardListDto, LibraryRulingDto
} from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import {
  AdvancedCardSearchViewmodel, LibraryCardListViewmodel, LibraryCardViewmodel, LibraryRulingViewmodel
} from "../../mtg-card";
import { IMtgCardViewmodelFactory } from "../interface";

export class MtgCardViewmodelFactory implements IMtgCardViewmodelFactory {
  // #region Private fields ---------------------------------------------------
  private readonly basicDataService: IBasicDataService;
  private readonly mtgSetService: IMtgSetService;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(basicDataService: IBasicDataService, mtgSetService: IMtgSetService) {
    this.basicDataService = basicDataService;
    this.mtgSetService = mtgSetService;
  }
  // #endregion

  // #region IMtgCardViewmodelFactory Members ---------------------------------
  public getLibraryCardDetailViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    cardId: number
  ): Promise<LibraryCardViewmodel> {
    return arcaneArchiveProxy
      .getData<LibraryCardDto>("library", "/public/card/" + cardId)
      .then((dto: LibraryCardDto) => new LibraryCardViewmodel(this.basicDataService, this.mtgSetService, dto));
  }

  public getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel {
    return new LibraryCardListViewmodel(this.basicDataService, this.mtgSetService, dto);
  }

  public getRulingsViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    oracleId: string
  ): Promise<Array<LibraryRulingViewmodel>> {
    return arcaneArchiveProxy
      .getData<Array<LibraryRulingDto>>("library", "/public/ruling/" + oracleId)
      .then((dtos: Array<LibraryRulingDto>) => dtos
        .map((dto: LibraryRulingDto) => new LibraryRulingViewmodel(dto))
        .sort((a: LibraryRulingViewmodel, b: LibraryRulingViewmodel) =>
          b.publishedAtDate.getTime() - a.publishedAtDate.getTime()
        )
      );
  }

  public getAdvancedCardSearchViewmodel(
    advancedCardSearch: AdvancedCardSearchDto,
    serviceContainer: IServiceContainer
  ): AdvancedCardSearchViewmodel {
    return new AdvancedCardSearchViewmodel(advancedCardSearch, serviceContainer);
  }

  public getCollectionCardlistViewmodel(dto: CollectionCardListDto): CollectionCardListViewmodel {
    return new CollectionCardListViewmodel(this.basicDataService, this.mtgSetService, dto);
  }
  // #endregion
}
