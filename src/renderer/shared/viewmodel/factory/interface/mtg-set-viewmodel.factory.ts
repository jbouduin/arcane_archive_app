import { CollectionDto, MtgSetDto, MtgSetTreeDto } from "../../../dto";
import { SelectOption } from "../../../types";
import { ExportSetViewmodel, MtgSetDetailViewmodel, MtgSetTreeViewmodel } from "../../mtg-set";

export interface IMtgSetViewmodelFactory {
  getExportSetViewmodel(
    dto: MtgSetDto,
    cardConditions: Array<string>,
    allCollections: Array<SelectOption<CollectionDto>>
  ): ExportSetViewmodel;
  getGroupMtgSetTreeViewmodel(group: string): MtgSetTreeViewmodel;
  getMtgSetDetailViewmodel(dto: MtgSetDto): MtgSetDetailViewmodel;
  getMtgSetTreeViewmodel(dto: MtgSetTreeDto): MtgSetTreeViewmodel;
}
