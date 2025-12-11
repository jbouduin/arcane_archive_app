import { MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { MtgSetTreeViewmodel } from "../../mtg-set";
import { MtgSetDetailViewmodel } from "../../mtg-set/mtg-set-detail.viewmodel";

export interface IMtgSetViewmodelFactory {
  getMtgSetTreeViewmodel(dto: MtgSetTreeDto): MtgSetTreeViewmodel;
  getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel;
  getMtgSetDetailViewmodel(dto: MtgSetDto): MtgSetDetailViewmodel;
}
