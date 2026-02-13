import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { useServices } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardQueryFilterDto, LibraryCardListDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";
import { CardSortField } from "../../../shared/types";
import { LibraryViewCenter } from "./library-view-center";
import { LibraryViewLeft } from "./library-view-left";
import { LibraryViewRight } from "./library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { LibraryViewState } from "./library-view.state";

export function LibraryView(props: LibraryViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { libraryCardSearchService, viewmodelFactoryService } = useServices();
  //#endregion

  //#region State -------------------------------------------------------------
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
    queryFilter: libraryCardSearchService.queryFilter,
    queryParams: libraryCardSearchService.queryParams,
    queryResult: libraryCardSearchService.queryResult,
    selectedCard: null,
    selectedSearchTab: libraryCardSearchService.selectedSearchTab,
    setsOnly: true
  };
  const [mosaicLayout, setMosaicLayout] = useState<MosaicNode<string>>(initialLayout);
  const [state, setState] = useState<LibraryViewState>(initialLibraryViewState);
  //#endregion

  //#region Initialize --------------------------------------------------------
  const cardSearchViewmodel = viewmodelFactoryService.mtgCardViewmodelFactory
    .getAdvancedCardSearchViewmodel(state.queryFilter, false);
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const elementMap: { [viewId: string]: React.JSX.Element; } = {
    a: (
      <LibraryViewLeft
        currentSelectedSearchTab={state.selectedSearchTab}
        viewmodel={cardSearchViewmodel}
        search={(dto: CardQueryFilterDto, setsOnly: boolean) => {
          libraryCardSearchService
            .getLibraryCards(dto, setsOnly, state.queryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                libraryCardSearchService.queryResult = resp;
                setState(prev => ({
                  ...prev,
                  queryFilter: dto,
                  queryResult: resp,
                  setsOnly: setsOnly
                }));
              },
              noop
            );
        }}
        selectedSearchTabChanged={
          (newSelection: string | number) => {
            libraryCardSearchService.selectedSearchTab = newSelection;
            // TODO search again ?
            setState(prev => ({ ...prev, selectedSearchTab: newSelection }));
          }
        }
        // TODO we need better than this
        viewmodelChanged={() => setState(prev => ({ ...prev }))}
      />
    ),
    b: (
      <LibraryViewCenter
        cardQueryParams={state.queryParams}
        queryResult={state.queryResult}
        cardSelected={(cardId: number | null) => setState(prev => ({ ...prev, selectedCard: cardId }))}
        pageNumberChanged={(newPage: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageNumber: newPage };
          libraryCardSearchService.queryParams = newCardQueryParams;
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                libraryCardSearchService.queryResult = resp;
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        pageSizeChanged={(newPageSize: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageSize: newPageSize };
          libraryCardSearchService.queryParams = newCardQueryParams;
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                libraryCardSearchService.queryResult = resp;
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
          libraryCardSearchService.queryParams = newCardQueryParams;
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                libraryCardSearchService.queryResult = resp;
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
  //#endregion
}
