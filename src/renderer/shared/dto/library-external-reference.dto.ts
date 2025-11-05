import { ExternalReferenceSource } from "../types/external-reference-source";

export type LibraryExternalReferenceDto = {
  source: ExternalReferenceSource;
  detail: string;
  value: string;
};
