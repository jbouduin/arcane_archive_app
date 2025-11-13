import { CardSortField } from "../../../types";
import { BaseLookupResult } from "./base-lookup-result";

export type CellLookup<T, U extends BaseLookupResult> = (rowIndex: number, valueCallBack: (row: T) => U) => U;
export type ClientSortCallback<T> = (comparator: (a: T, b: T) => number) => void;
export type ServerSortCallback = (columnName: CardSortField, sortDirection: SortDirection) => void;
export type SortType = "client" | "server";
export type SortDirection = "ASC" | "DESC";
