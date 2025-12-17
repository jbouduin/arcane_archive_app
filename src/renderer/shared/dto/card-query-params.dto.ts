import { SortDirection } from "../components/base/base-table";
import { CardSortField } from "../types";

export type CardQueryParamsDto = {
  pageSize: number;
  pageNumber: number;
  sortField: CardSortField;
  sortDirection: SortDirection;
};
