import { Props } from "@blueprintjs/core";
import { ContextMenuRenderer } from "@blueprintjs/table";
import { CardSortField } from "../../../types";
import { IBaseColumn } from "./base-column";
import { BaseLookupResult } from "./base-lookup-result";
import { SortDirection, SortType } from "./types";

export interface BaseTableViewProps<T> extends Props {
  data: Array<T>;
  sortableColumnDefinitions: Array<IBaseColumn<T, BaseLookupResult>>;
  sortedIndexMap: Array<number>;
  sortType: SortType;

  bodyContextMenuRenderer?: ContextMenuRenderer;
  onDataSelected: (cards?: Array<T>) => void;
  onClientColumnSort?: (changedSortedIndexMap: Array<number>) => void;
  onServerColumnSort?: (columnName: CardSortField, sortDirection: SortDirection) => void;
}
