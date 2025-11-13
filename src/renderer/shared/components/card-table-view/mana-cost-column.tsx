import { Menu, MenuItem } from "@blueprintjs/core";
import { Cell, CellRenderer } from "@blueprintjs/table";
import * as React from "react";
import { BaseColumn, CellLookup, ClientSortCallback, ServerSortCallback } from "../base/base-table";
import { CardSymbolRenderer } from "../card-symbol-renderer";
import { ManaCostLookupResult } from "./mana-cost-lookup-result";

export class ManaCostColumn<T> extends BaseColumn<T, ManaCostLookupResult> {
  // #region SortableColumn abstract methods implementationm -------------------
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

  protected getCellRenderer(getCellData: CellLookup<T, ManaCostLookupResult>): CellRenderer {
    return (rowIdx: number, _colIdx: number) => {
      return (
        <Cell>
          <CardSymbolRenderer
            cardSymbols={getCellData(rowIdx, this.valueCallBack).symbols}
            className="mana-cost-image-in-table"
          />
        </Cell>
      );
    };
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  private compare(a: T, b: T): number {
    const valueA = this.valueCallBack(a);
    const valueB = this.valueCallBack(b);
    const valueCompare = valueA.convertedManaCost - valueB.convertedManaCost;
    if (valueCompare == 0) {
      return valueA.defaultSortColumn.localeCompare(valueB.defaultSortColumn);
    } else {
      return valueCompare;
    }
  }
  // #endregion
}
