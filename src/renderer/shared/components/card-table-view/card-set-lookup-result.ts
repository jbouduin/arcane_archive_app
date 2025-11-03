import { BaseLookupResult } from "../base/base-table";

export interface CardSetLookupResult extends BaseLookupResult {
  cardSetName: string;
  keyruneCode: string;
  rarity: string;
}
