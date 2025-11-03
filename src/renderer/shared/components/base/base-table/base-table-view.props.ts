import { Props } from "@blueprintjs/core";
import { ContextMenuRenderer } from "@blueprintjs/table";
import { IBaseColumn } from "./base-column";
import { BaseLookupResult } from "./base-lookup-result";

export interface BaseTableViewProps<T> extends Props {
  data: Array<T>;
  sortableColumnDefinitions: Array<IBaseColumn<T, BaseLookupResult>>;
  sortedIndexMap: Array<number>;

  bodyContextMenuRenderer?: ContextMenuRenderer;
  onDataSelected: (cards?: Array<T>) => void;
  onColumnSorted: (changedSortedIndexMap: Array<number>) => void;
}
