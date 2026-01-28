import { Props } from "@blueprintjs/core";
import { SortDirection } from "../../../../shared/components/base/base-table";
import { QueryParamsDto, QueryResultDto } from "../../../../shared/dto";
import { CollectionCardListDto } from "../../../../shared/dto/collection-card-list.dto";
import { CardSortField } from "../../../../shared/types";

export interface CollectionViewCenterProps extends Props {
  cardQueryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;

  cardSelected: (cardId: number | null) => void;
  pageNumberChanged: (newPage: number) => void;
  pageSizeChanged: (newPageSize: number) => void;
  sortChanged: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
