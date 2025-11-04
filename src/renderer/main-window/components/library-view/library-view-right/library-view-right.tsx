import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { LibraryViewRightProps } from "./library-view-right.props";

export function LibraryViewRight(props: LibraryViewRightProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <CardDetailView cardId={props.cardId} showOtherLanguages={true} />
  );
  // #endregion
};
