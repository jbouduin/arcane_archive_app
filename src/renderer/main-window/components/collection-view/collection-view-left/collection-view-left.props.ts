import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { AdvancedCardSearchViewmodel } from "../../../../shared/viewmodel";

export interface CollectionViewLeftProps extends Props {
  currentSelectedSearchTab: string | number;
  expandedNodes: Set<number>;
  viewmodel: AdvancedCardSearchViewmodel;

  expandedNodesChanged: (expandedNodes: Set<number>) => void;
  search: (dto: CardQueryFilterDto, collectionsOnly: boolean) => void;
  selectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
  viewmodelChanged: () => void;
}
