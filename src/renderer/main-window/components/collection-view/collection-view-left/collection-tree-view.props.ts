import { Props } from "@blueprintjs/core";
import { CollectionDto } from "../../../../shared/dto";

export interface CollectionTreeViewProps extends Props {
  onCollectionSelected: (selectedData: Array<CollectionDto>) => void;
}
