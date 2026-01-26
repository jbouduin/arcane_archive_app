import { CollectionTreeView } from "./collection-tree-view";
import { CollectionViewLeftProps } from "./collection-view-left.props";

export function CollectionViewLeft(props: CollectionViewLeftProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <CollectionTreeView onCollectionSelected={props.onCollectionSelected} />
    </div>
  );
  // #endregion
}
