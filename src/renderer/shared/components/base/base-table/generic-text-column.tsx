import { Menu, MenuItem } from "@blueprintjs/core";
import { Cell, CellRenderer } from "@blueprintjs/table";
import * as React from "react";
import { BaseColumn } from "./base-column";
import { GenericTextLookupResult } from "./generic-text-lookup-result";
import { CellLookup, ClientSortCallback, ServerSortCallback } from "./types";

export class GenericTextColumn<T> extends BaseColumn<T, GenericTextLookupResult> {
  // #region SortableColumn abstract methods implementationm ------------------
  protected renderMenu(clientSortColumn?: ClientSortCallback<T>, serverSortColumn?: ServerSortCallback): React.JSX.Element {
    let sortAsc: (() => void) | undefined = undefined;
    let sortDesc: (() => void) | undefined = undefined;
    if (clientSortColumn) {
      sortAsc = () => clientSortColumn((a, b) => this.compare(a, b));
      sortDesc = () => clientSortColumn((a, b) => this.compare(b, a));
    }
    if (serverSortColumn && this.sortFieldName != null) {
      sortAsc = () => serverSortColumn(this.sortFieldName!, "ASC");
      sortDesc = () => serverSortColumn(this.sortFieldName!, "DESC");
    }

    if (sortAsc && sortDesc) {
      return (
        <Menu>
          <MenuItem icon="sort-asc" onClick={sortAsc} text="Sort Asc" />
          <MenuItem icon="sort-desc" onClick={sortDesc} text="Sort Desc" />
        </Menu>
      );
    } else {
      return (<></>);
    }
  }

  protected getCellRenderer(getCellData: CellLookup<T, GenericTextLookupResult>): CellRenderer {
    return (rowIdx: number, _colIdx: number) => (
      <Cell>
        {getCellData(rowIdx, this.valueCallBack).textValue}
      </Cell>
    );
  }
  // #endregion

  // #region Auxiliary methods -------------------------------------------------
  private compare(a: T, b: T): number {
    const valueA = this.valueCallBack(a);
    const valueB = this.valueCallBack(b);
    const valueCompare = valueA.textValue.localeCompare(valueB.textValue);
    if (valueCompare == 0) {
      return valueA.defaultSortColumn.localeCompare(valueB.defaultSortColumn);
    } else {
      return valueCompare;
    }
  }
  // #endregion
}
