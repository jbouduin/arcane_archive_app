import { LibraryExternalReferenceDto } from "./library-external-reference.dto";

export type LibraryCardfaceLanguageDto = {
  id: number;
  language: string;
  flavorText: string;
  name: string;
  typeLine: string;
  text: string;
  externalReferences: Array<LibraryExternalReferenceDto>;
};
