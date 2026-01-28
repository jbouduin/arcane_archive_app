import { Props } from "@blueprintjs/core";
import { MtgSetTreeDto } from "../../../../shared/dto";
import { CardFilterParamsDto } from "../../../../shared/dto/card-filter-params.dto";

export interface LibraryViewLeftProps extends Props {
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  currentSelectedSearchTab: string | number;

  setSelectionChanged: (sets: Array<MtgSetTreeDto>, execute: boolean) => void;
  cardFilterParamsChanged: (cardFilterParams: CardFilterParamsDto) => void;
  search: (sets: Array<MtgSetTreeDto>, cardFilterParams: CardFilterParamsDto) => void;
  selectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
}
