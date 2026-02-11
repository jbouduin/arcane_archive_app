import { CardfaceLanguageDetailDto } from "./cardface-language-detail.dto";
import { ExternalReferenceDetailDto } from "./external-reference-detail.dto";

export type CardfaceDetailDto = {
  id: number;
  sequence: number;
  artist: string;
  cmc: number;
  manaCost: string;
  oracleId: string;
  power: string;
  toughness: string;
  externalReferences: Array<ExternalReferenceDetailDto>;
  cardfaceLanguages: Array<CardfaceLanguageDetailDto>;
};
