import { AuditableDto, MasterDataDto } from "../../../common/dto/mtg-collection";
import { LibraryCardLanguageDto } from "./library-card-language.dto";
import { LibraryCardfaceDto } from "./library-cardface.dto";

export type LibraryCardDto = MasterDataDto<string> & AuditableDto & {
  id: number;
  code: string;
  cardName: string;
  mtgSetId: number;
  collectorNumber: string;
  lastSyncedAt: Date;
  colorIdentities: Array<string>;
  rarity: string;
  finishes: Array<string>;
  games: Array<string>;
  releasedAt: Date;
  cardfaces: Array<LibraryCardfaceDto>;
  cardLanguages: Array<LibraryCardLanguageDto>;
};
