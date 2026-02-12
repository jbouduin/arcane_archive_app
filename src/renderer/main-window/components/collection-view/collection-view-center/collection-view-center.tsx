import { isEqual } from "lodash";
import { memo, useMemo } from "react";
import { useServices } from "../../../../hooks";
import { PagingView, SortDirection } from "../../../../shared/components/base/base-table";
import { CardTableView } from "../../../../shared/components/card-table-view";
import { CardSortField } from "../../../../shared/types";
import { CollectionCardListViewmodel } from "../../../../shared/viewmodel";
import { CollectionViewCenterProps } from "./collection-view-center.props";
import { getTableData } from "./get-table-data";
import { sortableColumns } from "./sortable-columns";

const MemoCardTableView = memo(
  CardTableView<CollectionCardListViewmodel>,
  (prev, next) => prev.version == next.version && isEqual(prev.data, next.data) &&
    isEqual(prev.sortableColumnDefinitions, next.sortableColumnDefinitions)
);

export function CollectionViewCenter(props: CollectionViewCenterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { viewmodelFactoryService } = useServices();
  //#endregion

  // #region Memo --------------------------------------------------------------
  const sortableColumnDefinitions = useMemo(() => sortableColumns(), []);
  const tableData = useMemo(
    () => getTableData(props.queryResult, props.cardQueryParams, viewmodelFactoryService.mtgCardViewmodelFactory),
    [props.cardQueryParams, props.queryResult, props.version]
  );
  // #endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <MemoCardTableView
        // bodyContextMenuRenderer={(context: MenuContext) => contextMenu(context)}
        data={tableData}
        version={props.version}
        onServerColumnSort={(columName: CardSortField, sortDirection: SortDirection) =>
          props.sortChanged(columName, sortDirection)}
        onDataSelected={
          (cards?: Array<CollectionCardListViewmodel>) => {
            if (cards && cards.length > 0) {
              props.cardSelected(cards[0].cardId, cards[0].collectionId);
            } else {
              props.cardSelected(null, null);
            }
          }
        }
        sortableColumnDefinitions={sortableColumnDefinitions}
        sortType="server"
      />
      <PagingView
        currentPageNumber={props.queryResult.currentPageNumber}
        currentPageSize={props.queryResult.currentPageSize}
        hasMore={props.queryResult.hasMore}
        currentPageChanged={props.pageNumberChanged}
        currentPageSizeChanged={props.pageSizeChanged}
      />
    </div>
  );
  //#endregion
}
