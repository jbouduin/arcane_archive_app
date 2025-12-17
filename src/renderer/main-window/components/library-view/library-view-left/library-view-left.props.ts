import { Props } from "@blueprintjs/core";
import { MtgSetTreeDto } from "../../../../shared/dto";
import { CardFilterParamsDto } from "../../../../shared/dto/card-filter-params.dto";

export interface LibraryViewLeftProps extends Props {
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  currentSelectedSearchTab: string | number;

  onSetSelectionChanged: (sets: Array<MtgSetTreeDto>, execute: boolean) => void;
  onCardFilterParamsChanged: (cardFilterParams: CardFilterParamsDto) => void;
  onSearch: (sets: Array<MtgSetTreeDto>, cardFilterParams: CardFilterParamsDto) => void;
  onSelectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
}
