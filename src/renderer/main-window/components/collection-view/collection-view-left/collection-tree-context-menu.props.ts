import { Props } from "@blueprintjs/core";
import { ReactNode } from "react";
import { CollectionDto } from "../../../../shared/dto";

export interface CollectionTreeContextMenuProps extends Props {
  collection: CollectionDto;
  parentCollection: CollectionDto | null;
  parentPath: Array<string>;
  hasChildren: boolean;
  children: ReactNode;

  onDeleteCollection: (collection: CollectionDto) => void;
  onEditCollection: (
    collection: CollectionDto, parentCollection: CollectionDto | null, parentPath: Array<string>
  ) => void;
  onAddFolder: (collection: CollectionDto | null, parentPath: Array<string>) => void;
  onAddCollection: (collection: CollectionDto | null, parentPath: Array<string>) => void;
}
