import { cloneDeep, noop } from "lodash";
import { useReducer, useRef, useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useApiStatus, useServices, useSession } from "../../../hooks";
import { NotLoggedIn } from "../../../shared/components/not-logged-in";
import { ServiceNotAvailable } from "../../../shared/components/service-not-available";
import { CollectionViewDto } from "../../../shared/dto";
import { CollectionViewCenter } from "./collection-view-center";
import { CollectionViewLeft } from "./collection-view-left";
import { CollectionViewRight } from "./collection-view-right";
import { CollectionViewProps } from "./collection-view.props";

export function CollectionView(props: CollectionViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { loggedIn } = useSession();
  const { collectionCardSearchService, viewmodelFactoryService } = useServices();
  const { collectionServiceAvailable } = useApiStatus();
  //#endregion

  //#region State -------------------------------------------------------------
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
  const viewmodelRef = useRef(viewmodelFactoryService.desktopViewmodelFactory
    .getCollectionViewViewmodel(
      cloneDeep(collectionCardSearchService.viewDto),
      (dto: CollectionViewDto) => collectionCardSearchService.search(dto)
    )
  );
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    left: (
      <CollectionViewLeft
        viewmodel={viewmodelRef.current}
        viewmodelChanged={() => forceUpdate()}
      />
    ),
    center: (
      <CollectionViewCenter
        viewmodel={viewmodelRef.current}
        viewmodelChanged={() => forceUpdate()}
      />
    ),
    right: (
      <CollectionViewRight
        cardLanguageId={viewmodelRef.current.dto.selectedCard?.id || null}
        collectionId={viewmodelRef.current.dto.selectedCollection}
        onQuantityChanged={noop}
      /**
       * # NOW (qty: number) => {
       * //   const changedOne: CollectionCardListDto | undefined =
       * //     state.queryResult.resultList
       * //       .find((ccl: CollectionCardListDto) =>
       * //         ccl.id == state.selectedCard && ccl.collectionId == state.selectedCollection);
       * //   if (changedOne != null) {
       * //     changedOne.quantity = qty;
       * //   }
       * //   setState(prev => ({ ...prev, version: prev.version + 1 }));
       * // }
       */
      />
    )
  };
  return (
    <>
      {
        !collectionServiceAvailable && <ServiceNotAvailable serviceName="Collection service" />
      }
      {
        collectionServiceAvailable && loggedIn && (
          <Mosaic
            renderTile={(id: string) => elementMap[id]}
            value={mosaicLayout}
            onChange={(newNode: MosaicNode<string> | null) => setMosaicLayout(newNode || initialLayout)}
            {...props}
          />
        )
      }
      {
        collectionServiceAvailable && !loggedIn && (
          <NotLoggedIn {...props} />
        )
      }
    </>
  );
  //#endregion
}
