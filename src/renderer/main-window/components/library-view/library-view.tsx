import { noop } from "lodash";
import { useState } from "react";
import { Mosaic, MosaicNode } from "react-mosaic-component";
import { usePreferences, useServices } from "../../../hooks";
import { SortDirection } from "../../../shared/components/base/base-table";
import { CardQueryFilterDto, LibraryCardListDto, QueryParamsDto, QueryResultDto } from "../../../shared/dto";
import { CardSortField } from "../../../shared/types";
import { MtgSetTreeConfigurationViewmodel } from "../../../shared/viewmodel";
import { LibraryViewCenter } from "./library-view-center";
import { LibraryViewLeft } from "./library-view-left";
import { LibraryViewRight } from "./library-view-right";
import { LibraryViewProps } from "./library-view.props";
import { LibraryViewState } from "./library-view.state";

export function LibraryView(props: LibraryViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { libraryCardSearchService, viewmodelFactoryService } = useServices();
  const { preferences } = usePreferences();
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
    setsOnly: true,
    treeConfiguration: new MtgSetTreeConfigurationViewmodel(preferences.librarySetTreeSettings)
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
        treeConfiguration={state.treeConfiguration}
        treeConfigurationChanged={
          (configuration: MtgSetTreeConfigurationViewmodel) => setState(
            prev => ({ ...prev, treeConfiguration: configuration })
          )
        }
        search={(dto: CardQueryFilterDto, setsOnly: boolean) => {
          libraryCardSearchService
            .getLibraryCards(dto, setsOnly, state.queryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
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
            setState(prev => ({ ...prev, selectedSearchTab: newSelection }));
          }
        }
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
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
                setState(prev => ({ ...prev, queryParams: newCardQueryParams, queryResult: resp }));
              },
              noop
            );
        }}
        pageSizeChanged={(newPageSize: number) => {
          const newCardQueryParams: QueryParamsDto = { ...state.queryParams, pageSize: newPageSize };
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
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
          libraryCardSearchService
            .getLibraryCards(state.queryFilter, state.setsOnly, newCardQueryParams)
            .then(
              (resp: QueryResultDto<LibraryCardListDto>) => {
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
