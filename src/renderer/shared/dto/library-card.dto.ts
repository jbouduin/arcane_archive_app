import { AuditableDto, MasterDataDto } from "../../../common/dto";
import { CardLayout } from "../types/card-layout";
import { LibraryCardLanguageDto } from "./library-card-language.dto";
import { LibraryCardfaceDto } from "./library-cardface.dto";
import { LibraryLegality } from "./library-legality";

export type LibraryCardDto = MasterDataDto<string> & AuditableDto & {
  //#region fields ------------------------------------------------------------
  id: number;
  code: string;
  cardName: string;
  cardBackId: string | null;
  mtgSetId: number;
  collectorNumber: string;
  lastSyncedAt: Date;
  colorIdentities: Array<string>;
  rarity: string;
  layout: CardLayout;
  releasedAt: Date;
  legalities: Array<LibraryLegality>;
  cardfaces: Array<LibraryCardfaceDto>;
  cardLanguages: Array<LibraryCardLanguageDto>;
  //#endregion
};
