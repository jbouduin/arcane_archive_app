import { CardFilterParamsDto, CardQueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../../shared/dto";

export interface LibraryViewState {
  cardQueryParams: CardQueryParamsDto;
  cardFilterParams: CardFilterParamsDto;
  cardSetFilter: Array<MtgSetTreeDto>;
  selectedCard: number | null;
  queryResult: QueryResultDto<LibraryCardListDto>;
  currentSelectedSearchTab: string | number;
}
