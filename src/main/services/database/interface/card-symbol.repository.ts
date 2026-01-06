import { Selectable } from "kysely";
import { IResult } from "../../base";
import { CardSymbolTable } from "../schema";

export interface ICardSymbolRepository {
  getAll(): Promise<IResult<Array<Selectable<CardSymbolTable>>>>;
  upsert(code: string, svgUri: string): Promise<void>;
}
