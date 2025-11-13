import { BaseLookupResult } from "../base/base-table";

export interface CardSetLookupResult extends BaseLookupResult {
  cardSetName: string;
  // fields required for rendering the cell contents
  keyruneCode: string;
  rarity: string;
}
