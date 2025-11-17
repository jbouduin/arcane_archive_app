import { SortDirection } from "../components/base/base-table";
import { CardSortField } from "../types";
import { CardSearchDto } from "./card-search.dto";

export type CardQueryParamsDto = CardSearchDto & {
  pageSize: number;
  pageNumber: number;
  sortField: CardSortField;
  sortDirection: SortDirection;
};
