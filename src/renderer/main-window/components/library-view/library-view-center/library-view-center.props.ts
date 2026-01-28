import { Props } from "@blueprintjs/core";
import { SortDirection } from "../../../../shared/components/base/base-table";
import { QueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";

export interface LibraryViewCenterProps extends Props {
  cardQueryParams: QueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;

  cardSelected: (cardId: number | null) => void;
  pageNumberChanged: (newPage: number) => void;
  pageSizeChanged: (newPageSize: number) => void;
  sortChanged: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
