import { Props } from "@blueprintjs/core";
import { CachedImageSize } from "../../../../../common/types";
import { CardLayout } from "../../../types";
import { ScryFallImageStatus } from "../../../../../common/enums";

export interface CardImageViewProps extends Props {
  cardLayout: CardLayout;
  cachedImageSize: CachedImageSize;
  setCode: string;
  cardBackId: string | null;
  collectorNumber: string;
  scryfallLanguage: string;
  imageStatus: ScryFallImageStatus;
}
