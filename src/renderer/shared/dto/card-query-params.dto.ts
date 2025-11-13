import { SortDirection } from "../components/base/base-table";
import { CardSortField } from "../types";

export type CardQueryParamsDto = {
  selectedSets?: Array<number>;
  pageSize: number;
  pageNumber: number;
  sortField: CardSortField;
  sortDirection: SortDirection;
};
