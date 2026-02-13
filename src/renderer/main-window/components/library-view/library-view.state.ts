import { LibraryCardListDto, CardQueryFilterDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";

export interface LibraryViewState {
  queryFilter: CardQueryFilterDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;
  selectedCard: number | null;
  selectedSearchTab: string | number;
  setsOnly: boolean;
}
