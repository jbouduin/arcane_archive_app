import { memo } from "react";
import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { CollectionViewRightProps } from "./collection-view-right.props";

function CollectionViewRightImpl(props: CollectionViewRightProps): JSX.Element | null {
  //#region Rendering ---------------------------------------------------------
  if (props.cardLanguageId != null && props.collectionId != null) {
    return (
      <div className="mosaic-tile-content-wrapper">
        <CardDetailView
          mode="collection"
          cardLanguageId={props.cardLanguageId}
          collectionId={props.collectionId}
          onQuantityChanged={props.onQuantityChanged}
        />
      </div>
    );
  } else {
    return (null);
  }
  // #endregion
}

export const CollectionViewRight = memo(CollectionViewRightImpl);
