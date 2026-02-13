import { AuditableDto, MasterDataDto } from "../../../common/dto";
import { CardLayout } from "../types/card-layout";
import { CardLanguageDetailDto } from "./card-language-detail.dto";
import { CardfaceDetailDto } from "./cardface-detail.dto";
import { LibraryLegality } from "./library-legality";

export type CardDetailDto = MasterDataDto<string> & AuditableDto & {
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
  cardfaces: Array<CardfaceDetailDto>;
  cardLanguages: Array<CardLanguageDetailDto>;
  //#endregion
};
