import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices, useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { CollectionCardListDto, CollectionDto, QueryResultDto } from "../../../shared/dto";
import { CollectionViewCenter } from "./collection-view-center/collection-view-center";
import { CollectionViewLeft } from "./collection-view-left/collection-view-left";
import { CollectionViewRight } from "./collection-view-right/collection-view-right";
import { CollectionViewProps } from "./collection-view.props";
import { CollectionViewState } from "./collection-view.state";

export function CollectionView(props: CollectionViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const { cardSearchService } = useServices();
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
  const initialCollectionViewState: CollectionViewState = {
    cardQueryParams: cardSearchService.collectionQueryParams,
    queryResult: cardSearchService.collectionQueryResult,
    collectionFilter: new Array<CollectionDto>()
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<CollectionViewState>(initialCollectionViewState);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    left: (
      <CollectionViewLeft onCollectionSelected={
        (selection: Array<CollectionDto>) => {
          cardSearchService.collectionFilter = selection;
          cardSearchService.getCollectionCards(state.cardQueryParams, selection)
            .then(
              (res: QueryResultDto<CollectionCardListDto>) => {
                cardSearchService.collectionQueryResult = res;
                setState(prev => ({ ...prev, collectionFilter: selection, queryResult: res }));
              },
              noop
            );
        }
      }
      />
    ),
    center: (
      <CollectionViewCenter queryResult={state.queryResult} cardQueryParams={state.cardQueryParams} />
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
