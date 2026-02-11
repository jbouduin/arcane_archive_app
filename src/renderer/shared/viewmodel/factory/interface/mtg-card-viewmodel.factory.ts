import { IArcaneArchiveProxy, IServiceContainer } from "../../../context";
import { AdvancedCardSearchDto, CardDetailDto, CollectionCardListDto, LibraryCardListDto } from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import { AdvancedCardSearchViewmodel, CardDetailViewmodel, LibraryCardListViewmodel, LibraryRulingViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getCardDetailViewmodel(cardDetail: CardDetailDto): CardDetailViewmodel;
  getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  // NOW viewmodel factory should not return a promise
  getRulingsViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    oracleId: string
  ): Promise<Array<LibraryRulingViewmodel>>;
  getAdvancedCardSearchViewmodel(
    advancedCardSearch: AdvancedCardSearchDto,
    serviceContainer: IServiceContainer
  ): AdvancedCardSearchViewmodel;
  getCollectionCardlistViewmodel(dto: CollectionCardListDto): CollectionCardListViewmodel;
}
