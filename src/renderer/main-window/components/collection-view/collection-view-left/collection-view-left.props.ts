import { Props } from "@blueprintjs/core";
import { CollectionDto } from "../../../../shared/dto";

export interface CollectionViewLeftProps extends Props {
  onCollectionSelected: (selectedData: Array<CollectionDto>) => void;
}
