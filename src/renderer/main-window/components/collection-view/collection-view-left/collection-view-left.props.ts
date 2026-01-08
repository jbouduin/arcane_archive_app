import { Props } from "@blueprintjs/core";
import { CollectionTreeViewmodel } from "../../../../shared/viewmodel/collection/collection-tree.viewmodel";

export interface CollectionViewLeftProps extends Props {
  onCollectionSelected: (selectedData: Array<CollectionTreeViewmodel>) => void;
}
