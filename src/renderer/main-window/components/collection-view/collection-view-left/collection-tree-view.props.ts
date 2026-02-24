import { Props } from "@blueprintjs/core";
import { CardQueryFilterViewmodel } from "../../../../shared/viewmodel/desktop";

export interface CollectionTreeViewProps extends Props {
  viewmodel: CardQueryFilterViewmodel;

  viewmodelChanged: () => void;
}
