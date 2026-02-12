import { Props } from "@blueprintjs/core";

export interface CardDetailViewProps extends Props {
  // TODO if possible: find a better solution than defining number | null
  cardId: number | null;
  cardLanguageId: number | null;
  collectionId: number | null;

  onQuantityChanged: ((qty: number) => void) | null;
}
