import { LibraryCardfaceLanguageDto } from "./library-cardface-language.dto";

export type LibraryCardfaceDto = {
  id: number;
  sequence: number;
  artist: string;
  cmc: number;
  manaCost: string;
  oracleId: string;
  power: string;
  toughness: string;
  cardfaceLanguages: Array<LibraryCardfaceLanguageDto>;
};
