import { IArcaneArchiveProxy, IServiceContainer } from "../../../context";
import { AdvancedCardSearchDto, LibraryCardListDto } from "../../../dto";
import { AdvancedCardSearchViewmodel, LibraryCardListViewmodel, LibraryCardViewmodel, LibraryRulingViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
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
}
