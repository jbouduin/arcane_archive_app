import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { CollectionTreeViewmodel } from "../../../shared/viewmodel/collection/collection-tree.viewmodel";
import { CollectionViewCenter } from "./collection-view-center/collection-view-center";
import { CollectionViewLeft } from "./collection-view-left/collection-view-left";
import { CollectionViewRight } from "./collection-view-right/collection-view-right";
import { CollectionViewProps } from "./collection-view.props";

export function CollectionView(props: CollectionViewProps) {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  // #endregion

  // #region State ------------------------------------------------------------
  const initialLayout: MosaicNode<string> = {
    direction: "row",
    first: "left",
    second: {
      direction: "row",
      first: "center",
      second: "right",
    },
    splitPercentage: 20,
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [selectedCollection, setSelectedCollection] = useState<number | undefined>(undefined);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    left: (
      <CollectionViewLeft onCollectionSelected={
        (collections: Array<CollectionTreeViewmodel>) => {
          if (collections.length == 0) {
            setSelectedCollection(undefined);
          } else {
            const firstSelected = collections[0];
            if (firstSelected.folder) {
              setSelectedCollection(undefined);
            } else {
              setSelectedCollection(firstSelected.id);
            }
          }
        }
      }
      />
    ),
    center: (
      <CollectionViewCenter selectedCollectionId={selectedCollection} />
    ),
    right: (
      <CollectionViewRight />
    )
  };
  return (
    <>
      {
        loggedIn && (
          <Mosaic
            renderTile={(id: string) => elementMap[id]}
            value={mosaicLayout}
            onChange={(newNode: MosaicNode<string> | null) => setMosaicLayout(newNode || initialLayout)}
            {...props}
          />
        )
      }
      {
        !loggedIn && (
          <NotLoggedInView {...props} server="collection" />
        )
      }
    </>
  );
  // #endregion
}
