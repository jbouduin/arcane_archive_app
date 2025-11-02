import { Props } from "@blueprintjs/core";
import { MtgSetTreeConfigurationViewmodel, MtgSetTreeViewmodel } from "../../viewmodel";

export interface SetTreeViewProps extends Props {
  cardSets: Array<MtgSetTreeViewmodel>;
  configuration: MtgSetTreeConfigurationViewmodel;
  onSetsSelected: (sets: Array<MtgSetTreeViewmodel>) => void;
}
