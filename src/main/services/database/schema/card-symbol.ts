import { ColumnType, Selectable } from "kysely";
import { Synchronized } from "./base-types";

export interface CardSymbolTable extends Synchronized {
  code: ColumnType<string, string, never>;
  svg_uri: ColumnType<string, string, string>;
}

export type CardSymbolQueryDto = Selectable<CardSymbolTable>;
