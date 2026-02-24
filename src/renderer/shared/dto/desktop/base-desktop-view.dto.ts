import { BaseCardListDto } from "../base-card-list.dto";
import { CardQueryFilterDto } from "../card-query-filter.dto";
import { QueryParamsDto } from "../query-params.dto";
import { QueryResultDto } from "../query-result.dto";

export type BaseDesktopViewDto<T extends BaseCardListDto> = {
  queryFilter: CardQueryFilterDto;
  queryParams: QueryParamsDto;
  queryResult: QueryResultDto<T>;
  selectedCard: T | null;
  selectedSearchTab: string | number;
  // NOW selected nodes (reason: some nodes can be selected, but just be a folder)

  // NOW expanded nodes

  // NOW card table version (reason: it is used to re-render the table as cellRendererDependencies)
};
