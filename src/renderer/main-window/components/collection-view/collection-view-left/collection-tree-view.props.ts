import { Props } from "@blueprintjs/core";
import { CollectionDto } from "../../../../shared/dto";

export interface CollectionTreeViewProps extends Props {
  collectionSelected: (selectedData: Array<CollectionDto>, execute: boolean) => void;
}
