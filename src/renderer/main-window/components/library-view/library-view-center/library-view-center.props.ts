import { Props } from "@blueprintjs/core";
import { SortDirection } from "../../../../shared/components/base/base-table";
import { CardQueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";

export interface LibraryViewCenterProps extends Props {
  cardQueryParams: CardQueryParamsDto;
  queryResult: QueryResultDto<LibraryCardListDto>;

  onCardSelected: (cardId: number | null) => void;
  onCurrentPageChanged: (newPage: number) => void;
  onCurrentPageSizeChanged: (newPageSize: number) => void;
  onSortChanged: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
