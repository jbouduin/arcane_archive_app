import { Props } from "@blueprintjs/core";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { AdvancedCardSearchViewmodel } from "../../../../shared/viewmodel";

export interface CollectionTreeViewProps extends Props {
  /**
   * The expanded nodes, identified by `CollectionDto.id`
   */
  expandedNodes: Set<number>;
  viewmodel: AdvancedCardSearchViewmodel;

  expandedNodesChanged: (expandedNodes: Set<number>) => void;
  search: (dto: CardQueryFilterDto) => void;
  viewmodelChanged: () => void;
}
