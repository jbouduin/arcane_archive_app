import { Props } from "@blueprintjs/core";
import { CollectionTreeViewmodel } from "../../../../shared/viewmodel";

export interface CollectionTreeViewProps extends Props {
  onCollectionSelected: (selectedData: Array<CollectionTreeViewmodel>) => void;
}
