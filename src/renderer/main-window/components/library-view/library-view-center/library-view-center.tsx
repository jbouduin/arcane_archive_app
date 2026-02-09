import { MenuContext } from "@blueprintjs/table";
import { isEqual } from "lodash";
import { memo, useMemo } from "react";
import { useServices } from "../../../../hooks/use-services";
import { PagingView, SortDirection } from "../../../../shared/components/base/base-table";
import { CardTableView } from "../../../../shared/components/card-table-view";
import { CardSortField } from "../../../../shared/types";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel/mtg-card";
import { ContextMenu } from "./context-menu";
import { getTableData } from "./get-table-data";
import { LibraryViewCenterProps } from "./library-view-center.props";
import { getSortableColumns } from "./sortable-columns";

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
      () => getSortableColumns(),
      []
    );
    const tableData = useMemo(
      () => getTableData(props.queryResult, props.cardQueryParams, viewmodelFactoryService),
      [props.cardQueryParams, props.queryResult]
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
          onServerColumnSort={(columName: CardSortField, sortDirection: SortDirection) =>
            props.sortChanged(columName, sortDirection)}
          onDataSelected={
            (cards?: Array<LibraryCardListViewmodel>) => {
              props.cardSelected(cards && cards.length > 0 ? cards[0].cardId : null);
            }
          }
          sortableColumnDefinitions={sortableColumnDefinitions}
          sortType="server"
        />
        <PagingView
          hasMore={props.queryResult.hasMore}
          currentPageNumber={props.queryResult.currentPageNumber}
          currentPageSize={props.queryResult.currentPageSize}
          currentPageChanged={(newPage: number) => props.pageNumberChanged(newPage)}
          currentPageSizeChanged={(newPageSize: number) => props.pageSizeChanged(newPageSize)}
        />
      </div>
    );
    // #endregion
  },
  (prev: LibraryViewCenterProps, next: LibraryViewCenterProps) => {
    return isEqual(prev.cardQueryParams, next.cardQueryParams) && isEqual(prev.queryResult, next.queryResult);
  });
