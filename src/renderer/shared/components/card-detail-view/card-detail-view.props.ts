import { Props } from "@blueprintjs/core";

export interface CardDetailViewProps extends Props {
  cardId: number | null;
  showOtherLanguages: boolean;
}
