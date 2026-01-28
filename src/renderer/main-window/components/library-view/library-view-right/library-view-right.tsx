import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { LibraryViewRightProps } from "./library-view-right.props";

export function LibraryViewRight(props: LibraryViewRightProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <CardDetailView cardId={props.cardId} showOtherLanguages={true} />
    </div>
  );
  // #endregion
};
