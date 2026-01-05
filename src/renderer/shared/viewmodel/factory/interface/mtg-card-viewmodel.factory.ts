import { IArcaneArchiveProxyService } from "../../../context";
import { LibraryCardListDto } from "../../../dto";
import { LibraryCardListViewmodel, LibraryCardViewmodel, LibraryRulingViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getLibraryCardDetailViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService, cardId: number): Promise<LibraryCardViewmodel>;
  getRulingsViewmodel(arcaneArchiveProxy: IArcaneArchiveProxyService, oracleId: string): Promise<Array<LibraryRulingViewmodel>>;
}
