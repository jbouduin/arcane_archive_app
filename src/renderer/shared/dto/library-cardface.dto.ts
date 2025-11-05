import { LibraryCardfaceLanguageDto } from "./library-cardface-language.dto";
import { LibraryExternalReferenceDto } from "./library-external-reference.dto";

export type LibraryCardfaceDto = {
  id: number;
  sequence: number;
  artist: string;
  cmc: number;
  manaCost: string;
  oracleId: string;
  power: string;
  toughness: string;
  externalReferences: Array<LibraryExternalReferenceDto>;
  cardfaceLanguages: Array<LibraryCardfaceLanguageDto>;
};
