import { CellRenderer, Column, ColumnHeaderCell } from "@blueprintjs/table";
import * as React from "react";
import { CardSortField } from "../../../types";
import { BaseLookupResult } from "./base-lookup-result";
import { CellLookup, ClientSortCallback, ServerSortCallback } from "./types";

export interface IBaseColumn<T, U extends BaseLookupResult> {
  getClientSortedColumn(getCellData: CellLookup<T, U>, sortColumn: ClientSortCallback<T>): React.JSX.Element;
  getServerSortedColumn(getCellData: CellLookup<T, U>, sortColumn: ServerSortCallback): React.JSX.Element;
}

export abstract class BaseColumn<T, U extends BaseLookupResult> implements IBaseColumn<T, U> {
  // #region Protected fields -------------------------------------------------
  protected readonly index: number;
  protected readonly name: string;
  protected readonly sortFieldName: CardSortField | null;
  protected readonly valueCallBack: (row: T) => U;
  // #endregion

  // #region Constructor ------------------------------------------------------
  constructor(index: number, name: string, sortFieldName: CardSortField | null, valueCallBack: (row: T) => U) {
    this.index = index;
    this.name = name;
    this.sortFieldName = sortFieldName;
    this.valueCallBack = valueCallBack;
  }
  // #endregion

  // #region IBaseColumn Implementation ---------------------------------------
  public getClientSortedColumn(getCellData: CellLookup<T, U>, sortColumn: ClientSortCallback<T>): React.JSX.Element {
    const menuRenderer = this.renderMenu.bind(this, sortColumn, undefined);
    return (
      <Column
        cellRenderer={this.getCellRenderer(getCellData)}
        columnHeaderCellRenderer={() => <ColumnHeaderCell menuRenderer={menuRenderer} name={this.name} />}
        key={this.index}
        name={this.name}
      />
    );
  }

  public getServerSortedColumn(getCellData: CellLookup<T, U>, sortColumn: ServerSortCallback): React.JSX.Element {
    const menuRenderer = this.sortFieldName != null ? this.renderMenu.bind(this, undefined, sortColumn) : undefined;
    return (
      <Column
        cellRenderer={this.getCellRenderer(getCellData)}
        columnHeaderCellRenderer={() => <ColumnHeaderCell menuRenderer={menuRenderer} name={this.name} />}
        key={this.index}
        name={this.name}
      />
    );
  }
  // #endregion

  // #region Abstract methods --------------------------------------------------
  protected abstract renderMenu(clientSortColumn?: ClientSortCallback<T>, serverSortColumn?: ServerSortCallback): React.JSX.Element;
  protected abstract getCellRenderer(getCellData: CellLookup<T, U>): CellRenderer;
  // #endregion
}
