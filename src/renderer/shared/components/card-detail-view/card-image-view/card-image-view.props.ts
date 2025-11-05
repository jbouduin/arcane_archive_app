import { Props } from "@blueprintjs/core";
import { CardLayout } from "../../../types";

export interface CardImageViewProps extends Props {
  cardLayout: CardLayout;
  setCode: string;
  cardBackId: string | null;
  collectorNumber: string;
  scryfallLanguage: string;
}
