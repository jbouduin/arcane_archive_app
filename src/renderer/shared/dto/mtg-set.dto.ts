import { AuditableDto } from "./auditable.dto";
import { MasterDataDto } from "./master-data.dto";

export type MtgSetDto = AuditableDto & MasterDataDto<string> & {
  // #region proprietary fields ------------------------------------------------
  parentId: number | null;
  // #endregion

  // #region MtgJson fields ----------------------------------------------------
  /**
   * The number of cards in the set. This will default to totalSetSize if not available. Wizards of the Coast sometimes
   * prints extra cards beyond the set size into promos or supplemental products.
   */
  baseSetSize: number;
  /**
   * The total number of cards in the set, including promos and related supplemental products.
   */
  totalSetSize: number;
  /**
   * The block name the set is in.
   */
  block: string | null;
  /**
   * If the set is only available in foil.
   */
  foilOnly: boolean;
  /**
   * If the set is only available outside the United States of America.
   */
  foreignOnly: boolean;
  /**
   * If the set is only available in non-foil.
   */
  nonFoilOnly: boolean;
  /**
   * If the set is only available in online game play variations.
   */
  onlineOnly: boolean;
  /**
   * If the set is still in preview (spoiled). Preview sets do not have complete data.
   */
  partialPreview: boolean;
  /**
   * If the set is only available in paper game play.
   */
  paperOnly: boolean;
  /**
   * The tokens set code, formatted in uppercase.
   */
  tokenSetCode: string | null;
  /**
   * The expansion type of the set.
   */
  type: string;
  /**
   * The matching Keyrune code for set image icons.
   * https://keyrune.andrewgioia.com/
   */
  keyruneCode: string;
  /**
   * The release date for the set.
   */
  releaseDate: Date;
  // #endregion

  // #region External References -----------------------------------------------
  // externalReferences: Map<ExternalReferenceKey, string>;
  // #endregion
};
