import { isEqual } from "lodash";
import { memo, useMemo } from "react";
import { useServices } from "../../../../hooks";
import {
  BaseLookupResult, GenericNumericColumn, GenericTextColumn, IBaseColumn, PagingView, SortDirection
} from "../../../../shared/components/base/base-table";
import {
  CardTableView, getGenericTableData, SortableColumnsFactory
} from "../../../../shared/components/card-table-view";
import { CollectionCardListDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";
import { CollectionCardListViewmodel } from "../../../../shared/viewmodel";
import { CollectionViewCenterProps } from "./collection-view-center.props";

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
  const sortableColumnDefinitions = useMemo(
    () => {
      const result = new Array<IBaseColumn<CollectionCardListViewmodel, BaseLookupResult>>();
      let columNumber = 0;
      const factory = new SortableColumnsFactory();
      result.push(
        factory.getCollectorNumberColumn(columNumber++),
        factory.getRarityColumn(columNumber++),
        factory.getNameColumn(columNumber++),
        new GenericTextColumn<CollectionCardListViewmodel>(
          columNumber++,
          "Collection",
          null,
          (card: CollectionCardListViewmodel) => {
            return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.collection };
          }
        ), new GenericNumericColumn<CollectionCardListViewmodel>(
          columNumber++,
          "Quantity",
          null,
          (card: CollectionCardListViewmodel) => {
            return { defaultSortColumn: card.collectorNumberSortValue, numericValue: card.quantity };
          }
        ),
        factory.getTypeColumn(columNumber++),
        factory.getManaCostColumn(columNumber++),
        factory.getCardSetColumn(columNumber++),
        factory.getPowerColumn(columNumber++),
        factory.getToughnessColumn(columNumber++),
        factory.getColorIdentityColumn(columNumber++),
        new GenericTextColumn<CollectionCardListViewmodel>(
          columNumber++,
          "Language",
          null,
          (card: CollectionCardListViewmodel) => {
            return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.language };
          }
        )
      );
      return result;
    },
    []
  );
  const tableData = useMemo(
    () => getGenericTableData(
      props.queryResult.resultList
        .map((dto: CollectionCardListDto) =>
          viewmodelFactoryService.mtgCardViewmodelFactory.getCollectionCardlistViewmodel(dto)
        ),
      props.cardQueryParams),
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
