import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { QueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../../shared/dto";
import { CardFilterParamsDto } from "../../../shared/dto/card-filter-params.dto";
import { CardSortField } from "../../../shared/types";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { LibraryViewState } from "./library-view.state";

export function LibraryView(props: LibraryViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { libraryCardSearchService: searchService } = useServices();
  // #endregion

  // #region State ------------------------------------------------------------
  const initialLayout: MosaicNode<string> = {
    direction: "row",
    first: "a",
    second: {
      direction: "row",
      first: "b",
      second: "c",
    },
    splitPercentage: 20,
  };
  const initialLibraryViewState: LibraryViewState = {
    cardFilterParams: searchService.cardFilterParams,
    queryParams: searchService.queryParams,
    queryResult: searchService.queryResult,
    selectedCard: null,
    selectedSearchTab: searchService.selectedSearchTab,
    setFilter: searchService.setFilter
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<LibraryViewState>(initialLibraryViewState);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    a: (
      <LibraryViewLeft
        cardFilterParams={state.cardFilterParams}
        cardSetFilter={state.setFilter}
        currentSelectedSearchTab={state.selectedSearchTab}
        setSelectionChanged={
          (selection: Array<MtgSetTreeDto>, execute: boolean) => {
            searchService.setFilter = selection;
            if (execute) {
              searchService
                .getLibraryCards(null, state.queryParams, selection)
                .then(
                  (resp: QueryResultDto<LibraryCardListDto>) => {
                    searchService.queryResult = resp;
                    setState(prev => ({ ...prev, setFilter: selection, queryResult: resp }));
                  },
                  noop
                );
            } else {
              setState(prev => ({ ...prev, setFilter: selection }));
            }
          }
        }
        cardFilterParamsChanged={
          (cardFilterParams: CardFilterParamsDto) => {
            searchService.cardFilterParams = cardFilterParams;
            setState(prev => ({ ...prev, cardFilterParams: cardFilterParams }));
          }
        }
        search={
          (sets: Array<MtgSetTreeDto>, filterParams: CardFilterParamsDto) => {
            searchService.setFilter = sets;
            searchService.cardFilterParams = filterParams;
            searchService
              .getLibraryCards(filterParams, state.queryParams, sets)
              .then(
                (resp: QueryResultDto<LibraryCardListDto>) => {
                  searchService.queryResult = resp;
                  setState(prev => ({
                    ...prev,
                    cardFilterParams: filterParams,
                    setFilter: sets,
                    queryResult: resp
                  }));
                },
                noop
              );
          }
        }
        selectedSearchTabChanged={
          (newSelection: string | number) => {
            searchService.selectedSearchTab = newSelection;
            setState(prev => ({ ...prev, selectedSearchTab: newSelection }));
          }
        }
      />
    ),
    b: (
      <LibraryViewCenter
        cardQueryParams={state.queryParams}
        queryResult={state.queryResult}
        cardSelected={(cardId: number | null) => setState(prev => ({ ...prev, selectedCard: cardId }))}
        pageNumberChanged={(newPage: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageNumber: newPage };
          searchService.queryParams = newCardQueryParams;
          searchService
            .getLibraryCards(state.cardFilterParams, newCardQueryParams, state.setFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
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
            .getLibraryCards(state.cardFilterParams, newCardQueryParams, state.setFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
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
            .getLibraryCards(state.cardFilterParams, newCardQueryParams, state.setFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                searchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
      />
    ),
    c: <LibraryViewRight cardId={state.selectedCard} />
  };

  return (
    <Mosaic
      renderTile={(id: string) => elementMap[id]}
      value={mosaicLayout}
      onChange={(newNode: MosaicNode<string> | null) => setMosaicLayout(newNode || initialLayout)}
      {...props}
    />
  );
  // #endregion
}
