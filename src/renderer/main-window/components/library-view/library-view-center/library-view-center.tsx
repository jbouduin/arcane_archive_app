import { MenuContext } from "@blueprintjs/table";
import { isEqual, noop } from "lodash";
import { memo, useMemo } from "react";
import { useServices } from "../../../../hooks/use-services";
import {
  BaseLookupResult, GenericTextColumn, IBaseColumn, PagingView, SortDirection
} from "../../../../shared/components/base/base-table";
import { CardTableView, getGenericTableData } from "../../../../shared/components/card-table-view";
import { SortableColumnsFactory } from "../../../../shared/components/card-table-view/";
import { LibraryCardListDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel/mtg-card";
import { ContextMenu } from "./context-menu";
import { LibraryViewCenterProps } from "./library-view-center.props";

const MemoCardTableView = memo(
  CardTableView<LibraryCardListViewmodel>,
  (prev, next) => isEqual(prev.data, next.data) &&
    isEqual(prev.sortableColumnDefinitions, next.sortableColumnDefinitions)
);

export const LibraryViewCenter = memo(
  (props: LibraryViewCenterProps) => {
    // #region Hooks ------------------------------------------------------------
    const { viewmodelFactoryService, collectionService } = useServices();
    // #endregion

    // #region Memo --------------------------------------------------------------
    const sortableColumnDefinitions = useMemo(
      () => {
        const result = new Array<IBaseColumn<LibraryCardListViewmodel, BaseLookupResult>>();
        let columNumber = 0;
        const factory = new SortableColumnsFactory();
        result.push(
          factory.getCollectorNumberColumn(columNumber++),
          factory.getRarityColumn(columNumber++),
          factory.getNameColumn(columNumber++),
          factory.getTypeColumn(columNumber++),
          factory.getManaCostColumn(columNumber++),
          factory.getCardSetColumn(columNumber++),
          factory.getPowerColumn(columNumber++),
          factory.getToughnessColumn(columNumber++),
          factory.getColorIdentityColumn(columNumber++),
          new GenericTextColumn<LibraryCardListViewmodel>(
            columNumber++,
            "Languages",
            null,
            (card: LibraryCardListViewmodel) => {
              return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.languages };
            }
          )
        );
        return result;
      },
      []
    );
    const tableData = useMemo(
      () => getGenericTableData(
        props.viewmodel.dto.queryResult.resultList
          .map((dto: LibraryCardListDto) =>
            viewmodelFactoryService.mtgCardViewmodelFactory.getLibraryCardListViewmodel(dto)
          ),
        props.viewmodel.queryParamsViewmodel.dto),
      [props.viewmodel.queryParamsViewmodel, props.viewmodel.dtoToSave.queryResult]
    );
    // #endregion

    // #region Rendering --------------------------------------------------------
    return (
      <div className="mosaic-tile-content-wrapper">
        <MemoCardTableView
          bodyContextMenuRenderer={(context: MenuContext) => (
            <ContextMenu
              collections={collectionService.getCollections()}
              data={tableData}
              rootCollection={collectionService.getRootCollection()}
              menuContext={context}
            />
          )}
          data={tableData}
          // version={0}
          onServerColumnSort={(columName: CardSortField, sortDirection: SortDirection) => {
            props.viewmodel.queryParamsViewmodel.dto.sortField = columName;
            props.viewmodel.queryParamsViewmodel.dto.sortDirection = sortDirection;
            props.viewmodel.search()
              .then(
                () => props.viewmodelChanged(),
                noop
              );
          }}
          onDataSelected={(cards?: Array<LibraryCardListViewmodel>) => {
            props.viewmodel.dto.selectedCard = cards && cards.length > 0 ? cards[0].dto : null;
            props.viewmodelChanged();
          }}
          sortableColumnDefinitions={sortableColumnDefinitions}
          sortType="server"
        />
        <PagingView
          hasMore={props.viewmodel.dto.queryResult.hasMore}
          currentPageNumber={props.viewmodel.dto.queryResult.currentPageNumber}
          currentPageSize={props.viewmodel.dto.queryResult.currentPageSize}
          currentPageChanged={(newPage: number) => {
            props.viewmodel.queryParamsViewmodel.dto.pageNumber = newPage;
            props.viewmodel.search()
              .then(
                () => props.viewmodelChanged(),
                noop
              );
          }}
          currentPageSizeChanged={(newPageSize: number) => {
            props.viewmodel.queryParamsViewmodel.dto.pageSize = newPageSize;
            props.viewmodel.search()
              .then(
                () => props.viewmodelChanged(),
                noop
              );
          }}
        />
      </div>
    );
    // #endregion
  },
  (_prev: LibraryViewCenterProps, _next: LibraryViewCenterProps) => {
    return false; //isEqual(prev.viewmodel.dtoToSave.queryParams, next.viewmodel.dtoToSave.queryParams) &&
    //isEqual(prev.viewmodel.dtoToSave.queryResult, next.viewmodel.dtoToSave.queryResult);
  });
