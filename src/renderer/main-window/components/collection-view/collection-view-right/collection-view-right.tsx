import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { CollectionViewRightProps } from "./collection-view-right.props";

export function CollectionViewRight(props: CollectionViewRightProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <CardDetailView cardLanguageId={props.cardLanguageId} cardId={null} />
    </div>
  );
  // #endregion
}
