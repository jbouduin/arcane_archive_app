import { Props } from "@blueprintjs/core";

export interface CollectionViewRightProps extends Props {
  cardLanguageId: number | null;
  collectionId: number | null;
  onQuantityChanged: (qty: number) => void;
}
