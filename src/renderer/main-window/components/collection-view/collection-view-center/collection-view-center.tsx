import { isEqual } from "lodash";
import { memo, useMemo } from "react";
import { useServices } from "../../../../hooks";
import {
  BaseLookupResult, GenericTextColumn, IBaseColumn, PagingView, SortDirection
} from "../../../../shared/components/base/base-table";
import {
  CardSetColumn, CardTableView, CollectiorNumberColumn, ColorIdentityColumn, ManaCostColumn
} from "../../../../shared/components/card-table-view";
import { CollectionCardListDto, QueryParamsDto, QueryResultDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";
import { CollectionCardListViewmodel } from "../../../../shared/viewmodel";
import { CollectionViewCenterProps } from "./collection-view-center.props";

const MemoCardTableView = memo(
  CardTableView<CollectionCardListViewmodel>,
  (prev, next) => isEqual(prev.data, next.data) &&
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
      result.push(new CollectiorNumberColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Number",
        "collectorNumberSortValue",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, displayValue: card.collectorNumber };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Rarity",
        "rarity",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.rarityDisplayValue };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Name",
        "cardName",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.cardName };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Type",
        "typeLine",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.type };
        }
      ));
      result.push(new ManaCostColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Mana cost",
        "cmc",
        (card: CollectionCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue,
            convertedManaCost: card.convertedManaCost,
            symbols: card.manaCost
          };
        }
      ));
      result.push(new CardSetColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Set",
        "setName",
        (card: CollectionCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue,
            cardSetName: card.setName,
            keyruneCode: card.setKeyruneCode,
            rarity: card.rarity
          };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Power",
        "power",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.power };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Toughness",
        "toughness",
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.toughness };
        }
      ));
      result.push(new ColorIdentityColumn<CollectionCardListViewmodel>(
        columNumber++,
        "CI",
        "colorIdentitiesSortValue",
        (card: CollectionCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue,
            colorIdentitySortValue: card.colorIdentitySortValue,
            symbols: card.colorIdentity
          };
        }
      ));
      result.push(new GenericTextColumn<CollectionCardListViewmodel>(
        columNumber++,
        "Language",
        null,
        (card: CollectionCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.language };
        }
      ));
      return result;
    },
    []
  );
  const tableData = useMemo(
    () => getTableData(props.queryResult, props.cardQueryParams),
    [props.cardQueryParams, props.queryResult]
  );
  // #endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <MemoCardTableView
        // bodyContextMenuRenderer={(context: MenuContext) => contextMenu(context)}
        data={tableData}
        onServerColumnSort={(columName: CardSortField, sortDirection: SortDirection) =>
          props.sortChanged(columName, sortDirection)}
        onDataSelected={
          (cards?: Array<CollectionCardListViewmodel>) => {
            props.cardSelected(cards && cards.length > 0 ? cards[0].cardId : null);
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

  function getTableData(
    qryResult: QueryResultDto<CollectionCardListDto>, _cardQuery: QueryParamsDto
  ): Array<CollectionCardListViewmodel> {
    const result: Array<CollectionCardListViewmodel> = qryResult.resultList.map(
      (c: CollectionCardListDto) => viewmodelFactoryService.mtgCardViewmodelFactory.getCollectionCardlistViewmodel(c)
    );
    result.sort((a: CollectionCardListViewmodel, b: CollectionCardListViewmodel) =>
      a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue)
    );
    return result;
  }
  //#endregion
}
