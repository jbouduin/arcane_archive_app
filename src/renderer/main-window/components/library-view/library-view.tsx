import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardQueryParamsDto, LibraryCardListDto, MtgSetTreeDto, QueryResultDto } from "../../../shared/dto";
import { CardFilterParamsDto } from "../../../shared/dto/card-filter-params.dto";
import { CardSortField } from "../../../shared/types";
import { LibraryViewCenter } from "./library-view-center/library-view-center";
import { LibraryViewLeft } from "./library-view-left/library-view-left";
import { LibraryViewRight } from "./library-view-right/library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { LibraryViewState } from "./library-view.state";

export function LibraryView(props: LibraryViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const containerService = useServices();
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
    cardQueryParams: containerService.cardSearchService.libraryQueryParams,
    cardFilterParams: containerService.cardSearchService.libraryFilterParams,
    cardSetFilter: containerService.cardSearchService.librarySetFilter,
    selectedCard: null,
    queryResult: containerService.cardSearchService.libraryQueryResult,
    currentSelectedSearchTab: containerService.cardSearchService.librarySelectedSearchTab
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<LibraryViewState>(initialLibraryViewState);
  // #endregion

  // #region Rendering --------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    a: (
      <LibraryViewLeft
        cardFilterParams={state.cardFilterParams}
        cardSetFilter={state.cardSetFilter}
        currentSelectedSearchTab={state.currentSelectedSearchTab}
        onSetSelectionChanged={
          (selection: Array<MtgSetTreeDto>, execute: boolean) => {
            containerService.cardSearchService.librarySetFilter = selection;
            if (execute) {
              containerService.cardSearchService
                .getLibraryCards(state.cardQueryParams, null, selection)
                .then(
                  (resp: QueryResultDto<LibraryCardListDto>) => {
                    containerService.cardSearchService.libraryQueryResult = resp;
                    setState(prev => ({ ...prev, cardSetFilter: selection, queryResult: resp }));
                  },
                  noop
                );
            } else {
              setState(prev => ({ ...prev, cardSetFilter: selection }));
            }
          }
        }
        onCardFilterParamsChanged={
          (cardFilterParams: CardFilterParamsDto) => {
            containerService.cardSearchService.libraryFilterParams = cardFilterParams;
            setState(prev => ({ ...prev, cardFilterParams: cardFilterParams }));
          }
        }
        onSearch={
          (sets: Array<MtgSetTreeDto>, filterParams: CardFilterParamsDto) => {
            containerService.cardSearchService.librarySetFilter = sets;
            containerService.cardSearchService.libraryFilterParams = filterParams;
            containerService.cardSearchService
              .getLibraryCards(state.cardQueryParams, filterParams, sets)
              .then(
                (resp: QueryResultDto<LibraryCardListDto>) => {
                  containerService.cardSearchService.libraryQueryResult = resp;
                  setState(prev => ({
                    ...prev,
                    cardFilterParams: filterParams,
                    cardSetFilter: sets,
                    queryResult: resp
                  }));
                },
                noop
              );
          }
        }
        onSelectedSearchTabChanged={
          (newSelection: string | number) => {
            containerService.cardSearchService.librarySelectedSearchTab = newSelection;
            setState(prev => ({ ...prev, currentSelectedSearchTab: newSelection }));
          }
        }
      />
    ),
    b: (
      <LibraryViewCenter
        cardQueryParams={state.cardQueryParams}
        queryResult={state.queryResult}
        onCardSelected={(cardId: number | null) => setState(prev => ({ ...prev, selectedCard: cardId }))}
        onCurrentPageChanged={(newPage: number) => {
          const newCardQueryParams: CardQueryParamsDto = { ...state.cardQueryParams, pageNumber: newPage };
          containerService.cardSearchService.libraryQueryParams = newCardQueryParams;
          containerService.cardSearchService
            .getLibraryCards(newCardQueryParams, state.cardFilterParams, state.cardSetFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                containerService.cardSearchService.libraryQueryResult = resp;
                setState(prev => ({ ...prev, cardQueryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        onCurrentPageSizeChanged={(newPageSize: number) => {
          const newCardQueryParams: CardQueryParamsDto = { ...state.cardQueryParams, pageSize: newPageSize };
          containerService.cardSearchService.libraryQueryParams = newCardQueryParams;
          containerService.cardSearchService
            .getLibraryCards(newCardQueryParams, state.cardFilterParams, state.cardSetFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                containerService.cardSearchService.libraryQueryResult = resp;
                setState(prev => ({ ...prev, cardQueryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        onSortChanged={(fieldName: CardSortField, direction: SortDirection) => {
          const newCardQueryParams: CardQueryParamsDto = {
            ...state.cardQueryParams,
            sortDirection: direction,
            sortField: fieldName
          };
          containerService.cardSearchService.libraryQueryParams = newCardQueryParams;
          containerService.cardSearchService
            .getLibraryCards(newCardQueryParams, state.cardFilterParams, state.cardSetFilter)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                containerService.cardSearchService.libraryQueryResult = resp;
                setState(prev => ({ ...prev, cardQueryParams: newCardQueryParams, queryResult: resp }));
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
