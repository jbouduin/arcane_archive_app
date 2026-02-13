import { Props } from "@blueprintjs/core";
import { SortDirection } from "../../../../shared/components/base/base-table";
import { CollectionCardListDto, QueryParamsDto, QueryResultDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";

export interface CollectionViewCenterProps extends Props {
  cardQueryParams: QueryParamsDto;
  queryResult: QueryResultDto<CollectionCardListDto>;
  version: number;

  cardSelected: (cardId: number | null, collectionId: number | null) => void;
  pageNumberChanged: (newPage: number) => void;
  pageSizeChanged: (newPageSize: number) => void;
  sortChanged: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
