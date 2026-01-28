import { CardFilterParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";

export interface LibraryViewState {
  cardFilterParams: CardFilterParamsDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;
  selectedCard: number | null;
  selectedSearchTab: string | number;
  setFilter: Array<MtgSetTreeDto>;
}
