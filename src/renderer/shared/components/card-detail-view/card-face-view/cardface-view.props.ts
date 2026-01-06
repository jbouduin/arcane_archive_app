import { Props } from "@blueprintjs/core";
import { LibraryCardfaceViewmodel } from "../../../viewmodel/mtg-card/library-cardface.viewmodel";

export interface CardfaceViewProps extends Props {
  cardface: LibraryCardfaceViewmodel;
}
