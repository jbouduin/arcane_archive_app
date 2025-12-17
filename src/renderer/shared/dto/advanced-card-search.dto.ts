import { CardFilterParamsDto } from "./card-filter-params.dto";
import { MtgSetTreeDto } from "./mtg-set-tree.dto";

export type AdvancedCardSearchDto = {
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
};
