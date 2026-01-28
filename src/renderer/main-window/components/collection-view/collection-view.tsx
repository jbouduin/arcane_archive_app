import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices, useSession } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { CardFilterParamsDto, QueryParamsDto, CollectionCardListDto, CollectionDto, MtgSetTreeDto, QueryResultDto } from "../../../shared/dto";
import { CardSortField } from "../../../shared/types";
import { CollectionViewCenter } from "./collection-view-center/collection-view-center";
import { CollectionViewLeft } from "./collection-view-left/collection-view-left";
import { CollectionViewRight } from "./collection-view-right/collection-view-right";
import { CollectionViewProps } from "./collection-view.props";
import { CollectionViewState } from "./collection-view.state";

export function CollectionView(props: CollectionViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const { collectionCardSearchService: searchService } = useServices();
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
    cardFilterParams: searchService.cardFilterParams,
    collectionFilter: new Array<CollectionDto>(),
    queryParams: searchService.queryParams,
    queryResult: searchService.queryResult,
    selectedSearchTab: searchService.selectedSearchTab,
    selectedCard: null,
    setFilter: new Array<MtgSetTreeDto>()
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<CollectionViewState>(initialCollectionViewState);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    left: (
      <CollectionViewLeft
        cardFilterParams={state.cardFilterParams}
        cardSetFilter={state.setFilter}
        collectionFilter={state.collectionFilter}
        currentSelectedSearchTab={state.selectedSearchTab}
        cardFilterParamsChanged={
          (cardFilterParams: CardFilterParamsDto) => {
            searchService.cardFilterParams = cardFilterParams;
            setState(prev => ({ ...prev, cardFilterParams: cardFilterParams }));
          }
        }
        collectionSelectionChanged={(collections: Array<CollectionDto>, execute: boolean) => {
          searchService.collectionFilter = collections;
          if (execute) {
            searchService.getCollectionCards(null, state.queryParams, collections, state.setFilter)
              .then(
                (res: QueryResultDto<CollectionCardListDto>) => {
                  searchService.queryResult = res;
                  setState(prev => ({ ...prev, collectionFilter: collections, queryResult: res }));
                },
                noop
              );
          }
        }}
        search={
          (collections: Array<CollectionDto>, sets: Array<MtgSetTreeDto>, cardFilterParams: CardFilterParamsDto) => {
            searchService.cardFilterParams = cardFilterParams;
            searchService.collectionFilter = collections;
            searchService.setFilter = sets;
            searchService
              .getCollectionCards(cardFilterParams, state.queryParams, collections, sets)
              .then(
                (resp: QueryResultDto<CollectionCardListDto>) => {
                  searchService.queryResult = resp;
                  setState(prev => ({
                    ...prev,
                    cardFilterParams: cardFilterParams,
                    collectionFilter: collections,
                    queryResult: resp
                  }));
                },
                noop
              );
          }
        }
        selectedSearchTabChanged={(newSelection: string | number) => {
          searchService.selectedSearchTab = newSelection;
          setState(prev => ({ ...prev, selectedSearchTab: newSelection }));
        }}
        setSelectionChanged={(sets: Array<MtgSetTreeDto>) => {
          searchService.setFilter = sets;
          setState(prev => ({ ...prev, setFilter: sets }));
        }}
      />
    ),
    center: (
      <CollectionViewCenter
        cardQueryParams={state.queryParams}
        queryResult={state.queryResult}
        cardSelected={(cardId: number | null) => setState(prev => ({ ...prev, selectedCard: cardId }))}
        pageNumberChanged={(newPage: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageNumber: newPage };
          searchService.queryParams = newCardQueryParams;
          searchService
            .getCollectionCards(state.cardFilterParams, newCardQueryParams, state.collectionFilter, state.setFilter)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                searchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        pageSizeChanged={(newPageSize: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageSize: newPageSize };
          searchService.queryParams = newCardQueryParams;
          searchService
            .getCollectionCards(state.cardFilterParams, newCardQueryParams, state.collectionFilter, state.setFilter)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                searchService.queryResult = resp;
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
          searchService.queryParams = newCardQueryParams;
          searchService
            .getCollectionCards(state.cardFilterParams, newCardQueryParams, state.collectionFilter, state.setFilter)
            .then(
              (resp: QueryResultDto<CollectionCardListDto>) => {
                searchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
      />
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
