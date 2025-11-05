import { LibraryExternalReferenceDto } from "./library-external-reference.dto";

export type LibraryCardLanguageDto = {
  id: number;
  language: string;
  imageStatus: string;
  externalReferences: Array<LibraryExternalReferenceDto>;
};
