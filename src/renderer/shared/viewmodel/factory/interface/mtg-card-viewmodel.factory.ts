import { IServiceContainer } from "../../../context";
import {
  AdvancedCardSearchDto, CardDetailDto, CollectionCardListDto, LibraryCardListDto, LibraryRulingDto
} from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import {
  AdvancedCardSearchViewmodel, CardDetailViewmodel, LibraryCardListViewmodel, LibraryRulingViewmodel
} from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getCardDetailViewmodel(cardDetail: CardDetailDto): CardDetailViewmodel;
  getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getRulingsViewmodel(rulings: Array<LibraryRulingDto>): Array<LibraryRulingViewmodel>;
  getAdvancedCardSearchViewmodel(
    advancedCardSearch: AdvancedCardSearchDto,
    serviceContainer: IServiceContainer
  ): AdvancedCardSearchViewmodel;
  getCollectionCardlistViewmodel(dto: CollectionCardListDto): CollectionCardListViewmodel;
}
