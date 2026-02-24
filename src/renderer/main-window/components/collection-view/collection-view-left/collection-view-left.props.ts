import { Props } from "@blueprintjs/core";
import { CollectionViewViewmodel } from "../../../../shared/viewmodel/desktop";

export interface CollectionViewLeftProps extends Props {
  viewmodel: CollectionViewViewmodel;

  uiStateChanged: () => void;
  viewmodelChanged: () => void;
}
