import { LibraryCardDto, LibraryCardListDto, LibraryRulingDto } from "../../../dto";
import { LibraryCardViewmodel, LibraryCardListViewmodel } from "../../mtg-card";
import { LibraryRulingViewmodel } from "../../mtg-card/library-ruling.viewmodel";

export interface IMtgCardViewmodelFactory {
  getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getMtgCardDetailViewmodel(dto: LibraryCardDto): LibraryCardViewmodel;
  getRulingsViewmodel(dtos: Array<LibraryRulingDto>): Array<LibraryRulingViewmodel>;
}
