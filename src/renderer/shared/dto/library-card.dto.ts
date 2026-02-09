import { AuditableDto, MasterDataDto } from "../../../common/dto";
import { CardLayout } from "../types/card-layout";
import { LibraryCardLanguageDto } from "./library-card-language.dto";
import { LibraryCardfaceDto } from "./library-cardface.dto";
import { LibraryLegality } from "./library-legality";

export type LibraryCardDto = MasterDataDto<string> & AuditableDto & {
  //#region card fields -------------------------------------------------------
  cardName: string;
  cardBackId: string | null;
  collectorNumber: string;
  layout: CardLayout;
  lastSyncedAt: Date;
  rarity: string;
  releasedAt: Date;
  //#endregion

  //#region Foreign keys ------------------------------------------------------
  mtgSetId: number;
  //#endregion

  //#region Child entities ----------------------------------------------------
  colorIdentities: Array<string>;
  legalities: Array<LibraryLegality>;
  cardfaces: Array<LibraryCardfaceDto>;
  cardLanguages: Array<LibraryCardLanguageDto>;
  //#endregion
};
