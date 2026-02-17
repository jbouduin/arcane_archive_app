import { Props } from "@blueprintjs/core";
import { AdvancedCardSearchViewmodel } from "../../viewmodel/mtg-card/advanced-card-search.viewmodel";
import { CardQueryFilterDto } from "../../dto";

export interface AdvancedCardSearchProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  search: (dto: CardQueryFilterDto) => void;
  viewmodelChanged: () => void;
}
