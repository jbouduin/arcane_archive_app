import { Menu, MenuItem } from "@blueprintjs/core";
import { Cell, CellRenderer } from "@blueprintjs/table";
import classNames from "classnames";
import { BaseColumn, CellLookup, ClientSortCallback, ServerSortCallback } from "../base/base-table";
import { CardSetLookupResult } from "./card-set-lookup-result";

// LATER: sort by set release date also
export class CardSetColumn<T> extends BaseColumn<T, CardSetLookupResult> {
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

  protected getCellRenderer(getCellData: CellLookup<T, CardSetLookupResult>): CellRenderer {
    return (rowIdx: number, _colIdx: number) => {
      const cellValue = getCellData(rowIdx, this.valueCallBack);
      return (
        <Cell>
          <i
            key={`icon-${cellValue.cardSetName}`}
            className={classNames("ss", "ss-" + cellValue.keyruneCode.toLowerCase(), "ss-" + cellValue.rarity.toLowerCase())}
            style={{ paddingRight: "5px" }}
          >
          </i>
          {cellValue.cardSetName}
        </Cell>
      );
    };
  }
  // #endregion

  // #region Auxiliary methods ------------------------------------------------
  private compare(a: T, b: T): number {
    const valueA = this.valueCallBack(a);
    const valueB = this.valueCallBack(b);
    const valueCompare = valueA.cardSetName.localeCompare(valueB.cardSetName);
    if (valueCompare == 0) {
      return valueA.defaultSortColumn.localeCompare(valueB.defaultSortColumn);
    } else {
      return valueCompare;
    }
  }
  // #endregion
}
