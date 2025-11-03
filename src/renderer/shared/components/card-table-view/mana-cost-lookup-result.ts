import { BaseLookupResult } from "../base/base-table";

export interface ManaCostLookupResult extends BaseLookupResult {
  convertedManaCost: number;
  symbols: Array<string>;
}
