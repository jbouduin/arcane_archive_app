import {
  CardFilterParamsDto, CollectionCardListDto, CollectionDto, MtgSetTreeDto,
  QueryParamsDto, QueryResultDto
} from "../../../shared/dto";

export interface CollectionViewState {
  cardFilterParams: CardFilterParamsDto;
  collectionFilter: Array<CollectionDto>;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  selectedCard: number | null;
  selectedSearchTab: string | number;
  setFilter: Array<MtgSetTreeDto>;
}
