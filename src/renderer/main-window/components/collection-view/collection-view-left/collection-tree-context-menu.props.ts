import { Props } from "@blueprintjs/core";
import { ReactNode } from "react";
import { CollectionDto } from "../../../../shared/dto";

export interface CollectionTreeContextMenuProps extends Props {
  collection: CollectionDto;
  parentCollection: CollectionDto;
  hasChildren: boolean;
  children: ReactNode;

  onDeleteCollection: (collection: CollectionDto) => void;
  onEditCollection: (collection: CollectionDto, parent: CollectionDto) => void;
  onAddFolder: (parent: CollectionDto) => void;
  onAddCollection: (parent: CollectionDto) => void;
}
