import { SortDirection } from "../components/base/base-table";
import { CardSortField } from "../types";

export type QueryParamsDto = {
  pageNumber: number;
  pageSize: number;
  sortDirection: SortDirection;
  sortField: CardSortField;
};
