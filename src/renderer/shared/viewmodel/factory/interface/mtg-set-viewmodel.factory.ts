import { MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { MtgSetDetailViewmodel, MtgSetTreeViewmodel } from "../../mtg-set";

export interface IMtgSetViewmodelFactory {
  getMtgSetTreeViewmodel(dto: MtgSetTreeDto): MtgSetTreeViewmodel;
  getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel;
  getMtgSetDetailViewmodel(dto: MtgSetDto): MtgSetDetailViewmodel;
}
