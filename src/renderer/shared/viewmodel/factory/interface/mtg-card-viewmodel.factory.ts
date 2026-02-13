import { CardDetailDto, CardQueryFilterDto, CollectionCardListDto, LibraryCardListDto, LibraryRulingDto } from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import { AdvancedCardSearchViewmodel, CardDetailViewmodel, LibraryCardListViewmodel, LibraryRulingViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getCardDetailViewmodel(cardDetail: CardDetailDto): CardDetailViewmodel;
  getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getRulingsViewmodel(rulings: Array<LibraryRulingDto>): Array<LibraryRulingViewmodel>;
  getAdvancedCardSearchViewmodel(queryFilter: CardQueryFilterDto, useCollections: boolean): AdvancedCardSearchViewmodel;
  getCollectionCardlistViewmodel(dto: CollectionCardListDto): CollectionCardListViewmodel;
}
