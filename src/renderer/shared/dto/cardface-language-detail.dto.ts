import { ExternalReferenceDetailDto } from "./external-reference-detail.dto";

export type CardfaceLanguageDetailDto = {
  id: number;
  language: string;
  flavorText: string;
  name: string;
  typeLine: string;
  text: string;
  externalReferences: Array<ExternalReferenceDetailDto>;
};
