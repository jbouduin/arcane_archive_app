import { Props } from "@blueprintjs/core";
import { LibraryViewViewmodel } from "../../../../shared/viewmodel/desktop/library-view.viewmodel";

export interface LibraryViewCenterProps extends Props {
  viewmodel: LibraryViewViewmodel;

  viewmodelChanged: () => void;
}
