import { Props } from "@blueprintjs/core";
import { CardFilterParamsDto, CollectionDto, MtgSetTreeDto } from "../../../../shared/dto";

export interface CollectionViewLeftProps extends Props {
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  collectionFilter: Array<CollectionDto>;
  currentSelectedSearchTab: string | number;

  cardFilterParamsChanged: (cardFilterParams: CardFilterParamsDto) => void;
  collectionSelectionChanged: (selectedData: Array<CollectionDto>, execute: boolean) => void;
  search: (
    collections: Array<CollectionDto>, sets: Array<MtgSetTreeDto>, cardFilterParams: CardFilterParamsDto
  ) => void;
  selectedSearchTabChanged: (newSelectedSearchTab: string | number) => void;
  setSelectionChanged: (sets: Array<MtgSetTreeDto>) => void;
}
