import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { AdvancedCardSearchViewmodel } from "../../../../shared/viewmodel";

export interface CollectionTreeViewProps extends Props {
  viewmodel: AdvancedCardSearchViewmodel;
  search: (dto: CardQueryFilterDto) => void;
  viewmodelChanged: () => void;
}
