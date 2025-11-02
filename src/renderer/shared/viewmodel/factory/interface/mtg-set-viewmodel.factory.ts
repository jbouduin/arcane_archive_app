import { MtgSetDto } from "../../../dto";
import { MtgSetTreeViewmodel } from "../../mtg-set";

export interface IMtgSetViewmodelFactory {
  getMtgSetTreeViewmodel(dto: MtgSetDto): MtgSetTreeViewmodel;
  getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel;
}
