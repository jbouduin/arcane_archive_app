import { Props } from "@blueprintjs/core";
import { AdvancedCardSearchDto, CardFilterParamsDto, CollectionDto, MtgSetTreeDto } from "../../dto";

export interface AdvancedCardSearchViewProps extends Props {
  advancedCardSearch: AdvancedCardSearchDto;
  useCollections?: boolean;

  cardSetsChanged: (sets: Array<MtgSetTreeDto>) => void;
  collectionsChanged: (collections: Array<CollectionDto>) => void;
  cardFilterParamsChanged: (filter: CardFilterParamsDto) => void;
  search: (cardSearch: AdvancedCardSearchDto) => void;
}
