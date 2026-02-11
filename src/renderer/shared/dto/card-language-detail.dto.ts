import { ScryFallImageStatus } from "../../../common/enums";
import { ExternalReferenceDetailDto } from "./external-reference-detail.dto";

export type CardLanguageDetailDto = {
  id: number;
  language: string;
  imageStatus: ScryFallImageStatus;
  externalReferences: Array<ExternalReferenceDetailDto>;
};
