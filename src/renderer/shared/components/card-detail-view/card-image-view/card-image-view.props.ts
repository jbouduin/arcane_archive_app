import { Props } from "@blueprintjs/core";
import { CachedImageSize, ScryFallImageStatus } from "../../../../../common/types";
import { CardLayout } from "../../../types";

export interface CardImageViewProps extends Props {
  cardLayout: CardLayout;
  cachedImageSize: CachedImageSize;
  setCode: string;
  cardBackId: string | null;
  collectorNumber: string;
  scryfallLanguage: string;
  imageStatus: ScryFallImageStatus;
}
