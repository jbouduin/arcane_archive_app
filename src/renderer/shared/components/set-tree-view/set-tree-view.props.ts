import { Props } from "@blueprintjs/core";
import { MtgSetTreeDto } from "../../dto";
import { MtgSetTreeConfigurationViewmodel, MtgSetTreeViewmodel } from "../../viewmodel";

export interface SetTreeViewProps extends Props {
  cardSets: Array<MtgSetTreeViewmodel>;
  configuration: MtgSetTreeConfigurationViewmodel;
  onSetsSelected: (sets: Array<MtgSetTreeDto>) => void;
}
