import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useApiStatus, useServices, useSession } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { NotLoggedIn } from "../../../shared/components/not-logged-in";
import { ServiceNotAvailable } from "../../../shared/components/service-not-available";
import { CardQueryFilterDto, CollectionCardListDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";
import { CardSortField } from "../../../shared/types";
import { CollectionViewCenter } from "./collection-view-center";
import { CollectionViewLeft } from "./collection-view-left";
import { CollectionViewRight } from "./collection-view-right";
import { CollectionViewProps } from "./collection-view.props";
import { CollectionViewState } from "./collection-view.state";

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
  const initialCollectionViewState: CollectionViewState = {
    collectionsOnly: true,
    expandedNodes: new Set<number>(),
    queryFilter: collectionCardSearchService.queryFilter,
    queryParams: collectionCardSearchService.queryParams,
    queryResult: collectionCardSearchService.queryResult,
    selectedSearchTab: collectionCardSearchService.selectedSearchTab,
    selectedCard: null,
    selectedCollection: null,
    version: 0
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<CollectionViewState>(initialCollectionViewState);
  //#endregion

  //#region Initialize ---------------------------------------------------------
  const cardSearchViewmodel = viewmodelFactoryService.mtgCardViewmodelFactory
    .getAdvancedCardSearchViewmodel(state.queryFilter, true);
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    left: (
      <CollectionViewLeft
        currentSelectedSearchTab={state.selectedSearchTab}
        expandedNodes={state.expandedNodes}
        viewmodel={cardSearchViewmodel}
        expandedNodesChanged={(expandedNodes: Set<number>) =>
          setState(prev => ({ ...prev, expandedNodes: expandedNodes }))}
        search={(dto: CardQueryFilterDto, collectionsOnly: boolean) => {
          void collectionCardSearchService
            .getCollectionCards(dto, collectionsOnly, state.queryParams)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                setState(prev => ({
                  ...prev,
                  queryFilter: dto,
                  queryResult: resp,
                  collectionsOnly: collectionsOnly
                }));
              },
              noop
            );
        }}
        selectedSearchTabChanged={(newSelection: string | number) => {
          collectionCardSearchService.selectedSearchTab = newSelection;
          setState(prev => ({ ...prev, selectedSearchTab: newSelection }));
        }}
        viewmodelChanged={() => setState(prev => ({ ...prev }))}
      />
    ),
    center: (
      <CollectionViewCenter
        cardQueryParams={state.queryParams}
        queryResult={state.queryResult}
        version={state.version}
        cardSelected={
          (cardId: number | null, collectionId: number | null) => setState(prev => (
            { ...prev, selectedCard: cardId, selectedCollection: collectionId }
          ))
        }
        pageNumberChanged={(newPage: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageNumber: newPage };
          // collectionCardSearchService.queryParams = newCardQueryParams;
          collectionCardSearchService
            .getCollectionCards(state.queryFilter, state.collectionsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                // collectionCardSearchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        pageSizeChanged={(newPageSize: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageSize: newPageSize };
          // collectionCardSearchService.queryParams = newCardQueryParams;
          collectionCardSearchService
            .getCollectionCards(state.queryFilter, state.collectionsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                // collectionCardSearchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        sortChanged={(fieldName: CardSortField, direction: SortDirection) => {
          const newCardQueryParams: QueryParamsDto = {
            ...state.queryParams,
            sortDirection: direction,
            sortField: fieldName
          };
          // collectionCardSearchService.queryParams = newCardQueryParams;
          collectionCardSearchService
            .getCollectionCards(state.queryFilter, state.collectionsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                // collectionCardSearchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
      />
    ),
    right: (
      <CollectionViewRight
        cardLanguageId={state.selectedCard}
        collectionId={state.selectedCollection}
        onQuantityChanged={
          (qty: number) => {
            const changedOne: CollectionCardListDto | undefined =
              state.queryResult.resultList
                .find((ccl: CollectionCardListDto) =>
                  ccl.id == state.selectedCard && ccl.collectionId == state.selectedCollection);
            if (changedOne != null) {
              changedOne.quantity = qty;
            }
            setState(prev => ({ ...prev, version: prev.version + 1 }));
          }
        }
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
