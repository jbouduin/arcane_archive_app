import { Props } from "@blueprintjs/core";
import { CollectionViewViewmodel } from "../../../../shared/viewmodel/desktop";

export interface CollectionViewCenterProps extends Props {
  viewmodel: CollectionViewViewmodel;

  viewmodelChanged: () => void;
}
