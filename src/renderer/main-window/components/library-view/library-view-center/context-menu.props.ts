import { Props } from "@blueprintjs/core";
import { MenuContext } from "@blueprintjs/table";
import { CollectionDto } from "../../../../shared/dto";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel";

export interface ContextMenuProps extends Props {
  collections: Array<CollectionDto>;
  data: Array<LibraryCardListViewmodel>;
  rootCollection: CollectionDto | null;
  menuContext: MenuContext;
}
