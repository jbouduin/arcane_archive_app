import { CardFilterParamsDto } from "./card-filter-params.dto";
import { CollectionDto } from "./collection.dto";
import { MtgSetTreeDto } from "./mtg-set-tree.dto";

export type AdvancedCardSearchDto = {
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  collectionFilter: Array<CollectionDto>;
};
