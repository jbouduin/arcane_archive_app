import { LibraryCardDto, LibraryCardListDto } from "../../../dto";
import { LibraryCardViewmodel, LibraryCardListViewmodel } from "../../mtg-card";

export interface IMtgCardViewmodelFactory {
  getMtgCardListViewmodel(dto: LibraryCardListDto): LibraryCardListViewmodel;
  getMtgCardDetailViewmodel(dto: LibraryCardDto): LibraryCardViewmodel;
}
