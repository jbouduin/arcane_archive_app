import { ExternalReferenceSource } from "../types/external-reference-source";

export type ExternalReferenceDetailDto = {
  source: ExternalReferenceSource;
  detail: string;
  value: string;
};
