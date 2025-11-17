import { Props } from "@blueprintjs/core";
import { MtgSetDto } from "../../../dto";

export interface CardSetSelectProps extends Props {
  allCardSets: Array<MtgSetDto>;
  onClearOptions: () => void;
  onOptionAdded: (cardSet: MtgSetDto) => void;
  onOptionRemoved: (cardSetId: MtgSetDto) => void;
  selectedCardSets: Array<MtgSetDto>;
}
