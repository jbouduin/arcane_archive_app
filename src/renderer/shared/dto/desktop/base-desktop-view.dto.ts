import { BaseCardListDto } from "../base-card-list.dto";
import { CardQueryFilterDto } from "../card-query-filter.dto";
import { QueryParamsDto } from "../query-params.dto";
import { QueryResultDto } from "../query-result.dto";
import { UiStateDto } from "./ui-state.dto";

export type BaseDesktopViewDto<T extends BaseCardListDto> = {
  queryFilter: CardQueryFilterDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<T>;
  selectedCard: T | null;
  selectedSearchTab: string | number;
  uiState: UiStateDto;
};
