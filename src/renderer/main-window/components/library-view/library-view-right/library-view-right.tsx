import { memo } from "react";
import { CardDetailView } from "../../../../shared/components/card-detail-view/card-detail-view";
import { LibraryViewRightProps } from "./library-view-right.props";

function LibraryViewRightImpl(props: LibraryViewRightProps): JSX.Element | null {
  //#region Rendering ---------------------------------------------------------
  if (props.cardId != null) {
    return (
      <div className="mosaic-tile-content-wrapper">
        <CardDetailView
          mode="library"
          cardId={props.cardId}
        />
      </div>
    );
  } else {
    return (null);
  }
  //#endregion
};

export const LibraryViewRight = memo(LibraryViewRightImpl);
