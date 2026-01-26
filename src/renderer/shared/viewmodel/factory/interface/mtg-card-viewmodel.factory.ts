import { IArcaneArchiveProxy, IServiceContainer } from "../../../context";
import { AdvancedCardSearchDto, CollectionCardListDto, LibraryCardListDto } from "../../../dto";
import { CollectionCardListViewmodel } from "../../collection";
import { AdvancedCardSearchViewmodel, LibraryCardListViewmodel, LibraryCardViewmodel, LibraryRulingViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getLibraryCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getLibraryCardDetailViewmodel(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    cardId: number
  ): Promise<LibraryCardViewmodel>;
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
