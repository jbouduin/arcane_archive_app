import { Props } from "@blueprintjs/core";
import { MtgSetTreeConfigurationViewmodel } from "../../viewmodel";
import { AdvancedCardSearchViewmodel } from "../../viewmodel/mtg-card/advanced-card-search.viewmodel";

export interface SetTreeViewProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  configuration: MtgSetTreeConfigurationViewmodel;

  viewmodelChanged: () => void;
}
