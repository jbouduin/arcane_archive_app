import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../dto";
import { MtgSetTreeConfigurationViewmodel } from "../../viewmodel";
import { AdvancedCardSearchViewmodel } from "../../viewmodel/mtg-card/advanced-card-search.viewmodel";

export interface SetTreeViewProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  configuration: MtgSetTreeConfigurationViewmodel;

  search: (dto: CardQueryFilterDto) => void;
  treeConfigurationChanged: (treeConfiguration: MtgSetTreeConfigurationViewmodel) => void;
  viewmodelChanged: () => void;
}
