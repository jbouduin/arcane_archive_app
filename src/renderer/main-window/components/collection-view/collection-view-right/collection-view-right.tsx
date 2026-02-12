import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { CollectionViewRightProps } from "./collection-view-right.props";

export function CollectionViewRight(props: CollectionViewRightProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <CardDetailView
        cardId={null}
        cardLanguageId={props.cardLanguageId}
        collectionId={props.collectionId}
        onQuantityChanged={props.onQuantityChanged}
      />
    </div>
  );
  // #endregion
}
