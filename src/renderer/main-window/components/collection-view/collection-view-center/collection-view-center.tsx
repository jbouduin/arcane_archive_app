import { H1, H2 } from "@blueprintjs/core";
import { CollectionViewCenterProps } from "./collection-view-center.props";

export function CollectionViewCenter(props: CollectionViewCenterProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <H1>Selected collection</H1>
      <H2>{props.selectedCollectionId}</H2>
    </div>
  );
  // #endregion
}
