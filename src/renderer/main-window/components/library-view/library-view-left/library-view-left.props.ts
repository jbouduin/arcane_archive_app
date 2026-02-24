import { Props } from "@blueprintjs/core";
import { LibraryViewViewmodel } from "../../../../shared/viewmodel/desktop/library-view.viewmodel";

export interface LibraryViewLeftProps extends Props {
  viewmodel: LibraryViewViewmodel;
  uiStateChanged: () => void;
  viewmodelChanged: () => void;
}
