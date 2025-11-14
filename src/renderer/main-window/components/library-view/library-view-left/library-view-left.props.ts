import { Props } from "@blueprintjs/core";
import { MtgSetTreeViewmodel } from "../../../../shared/viewmodel";

export interface LibraryViewLeftProps extends Props {
  onSelectionChanged: (sets: Array<MtgSetTreeViewmodel>) => void;
}
