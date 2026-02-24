import { Props } from "@blueprintjs/core";
import { AdvancedCardSearchViewmodel } from "../../viewmodel/mtg-card/advanced-card-search.viewmodel";

export interface AdvancedCardSearchProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;

  search: () => void;
  viewmodelChanged: () => void;
}
