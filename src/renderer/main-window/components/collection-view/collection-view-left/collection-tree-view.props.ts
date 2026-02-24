import { Props } from "@blueprintjs/core";
import { CardQueryFilterViewmodel } from "../../../../shared/viewmodel/desktop";

export interface CollectionTreeViewProps extends Props {
  expandedNodes: Array<number | string>;
  viewmodel: CardQueryFilterViewmodel;

  nodeCollapsed: (node: string | number) => void;
  nodeExpanded: (node: string | number) => void;
  selectionCriteriaChanged: () => void;
}
