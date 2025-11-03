import { MtgLibraryCardListDto } from "../../../dto";
import { MtgLibraryCardListViewmodel } from "../../mtg-card/mtg-library-card-list.viewmodel";

export interface IMtgCardViewmodelFactory {
  getMtgCardListViewmodel(dto: MtgLibraryCardListDto): MtgLibraryCardListViewmodel;
}
