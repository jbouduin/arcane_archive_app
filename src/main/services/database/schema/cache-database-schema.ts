import { CardfaceTable } from "./cardface";
import { CardSymbolTable } from "./card-symbol";

export interface CacheDatabaseSchema {
  card_symbol: CardSymbolTable;
  cardface: CardfaceTable;
}
