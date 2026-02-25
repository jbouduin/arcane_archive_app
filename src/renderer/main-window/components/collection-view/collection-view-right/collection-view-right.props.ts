import { Props } from "@blueprintjs/core";
import { OnQuantityChangedHandler } from "../../../../shared/components/card-detail-view/card-ownership";

export interface CollectionViewRightProps extends Props {
  cardLanguageId: number | null;
  collectionId: number | null;
  onQuantityChanged: OnQuantityChangedHandler;
}
