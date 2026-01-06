import { Props } from "@blueprintjs/core";
import { AdvancedCardSearchDto, CardFilterParamsDto, MtgSetTreeDto } from "../../dto";

export interface AdvancedCardSearchViewProps extends Props {
  advancedCardSearch: AdvancedCardSearchDto;

  onCardSetsChanged: (sets: Array<MtgSetTreeDto>) => void;
  onCardFilterParamsChanged: (filter: CardFilterParamsDto) => void;
  onSearch: (cardSearch: AdvancedCardSearchDto) => void;
}
