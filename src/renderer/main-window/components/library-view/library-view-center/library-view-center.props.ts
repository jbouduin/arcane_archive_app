import { Props } from "@blueprintjs/core";
import { MtgSetTreeViewmodel } from "../../../../shared/viewmodel";

export interface LibraryViewCenterProps extends Props {
  selectedSets: Array<MtgSetTreeViewmodel>;

  onCardSelected: (cardId: number | null) => void;
}
