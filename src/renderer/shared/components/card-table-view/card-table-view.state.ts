import { BaseLookupResult, IBaseColumn } from "../base/base-table";

export interface CardTableViewState {
  sortableColumnDefintions: Array<IBaseColumn<unknown, BaseLookupResult>>;
  sortedIndexMap: Array<number>;
}
