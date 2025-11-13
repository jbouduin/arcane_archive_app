import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { BaseLookupResult, GenericTextColumn, IBaseColumn, PagingView, SortDirection } from "../../../../shared/components/base/base-table";
import { CardSetColumn, CardTableView, CollectiorNumberColumn, ColorIdentityColumn, ManaCostColumn } from "../../../../shared/components/card-table-view";
import { CardQueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../../../shared/dto";
import { CardSortField } from "../../../../shared/types";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel/mtg-card";
import { LibraryViewCenterProps } from "./library-view-center.props";

export function LibraryViewCenter(props: LibraryViewCenterProps) {
  // #region State ------------------------------------------------------------
  const initialQueryResult: QueryResultDto<LibraryCardListDto> = {
    hasMore: false,
    resultList: new Array<LibraryCardListDto>(),
    currentPageNumber: 0,
    currentPageSize: 50
  };
  const [queryResult, setQueryResult] = React.useState<QueryResultDto<LibraryCardListDto>>(initialQueryResult);
  const [sortedIndexMap, setSortedIndexMap] = React.useState<Array<number>>(new Array<number>());
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      void serviceContainer.collectionManagerProxy.getCards(props.cardQuery)
        .then(
          (queryResult: QueryResultDto<LibraryCardListDto>) => setQueryResult(queryResult),
          () => setQueryResult(initialQueryResult)
        );
      // .then(() => setSortedIndexMap(new Array<number>()));
    },
    [props.cardQuery]
  );
  // #endregion

  // #region Memo --------------------------------------------------------------
  const sortableColumnDefinitions = React.useMemo(
    () => {
      const result = new Array<IBaseColumn<LibraryCardListViewmodel, BaseLookupResult>>();
      let columNumber = 0;
      result.push(new CollectiorNumberColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Number",
        "collectorNumberSortValue",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, displayValue: card.collectorNumber };
        }
      ));
      // LATER we now have raritySortValue (to be used when client sorting) -> then we need a specific column definition
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Rarity",
        "rarity",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.rarityDisplayValue };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Name",
        "cardName",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.cardName };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Type",
        "typeLine",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.type };
        }
      ));
      result.push(new ManaCostColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Mana cost",
        "cmc",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, convertedManaCost: card.convertedManaCost, symbols: card.manaCost };
        }
      ));
      result.push(new CardSetColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Set",
        "setName",
        (card: LibraryCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue, cardSetName: card.setName, keyruneCode: card.setKeyruneCode, rarity: card.rarity
          };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Power",
        "power",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.power };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Toughness",
        "toughness",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.toughness };
        }
      ));
      result.push(new ColorIdentityColumn<LibraryCardListViewmodel>(
        columNumber++,
        "CI",
        "colorIdentitiesSortValue",
        (card: LibraryCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue,
            colorIdentitySortValue: card.colorIdentitySortValue,
            symbols: card.colorIdentity
          };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Languages",
        null,
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.languages };
        }
      ));
      return result;
    },
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <CardTableView<LibraryCardListViewmodel>
        // bodyContextMenuRenderer={(context: MenuContext) => contextMenu(context)}
        data={getTableData(queryResult, props.cardQuery)}
        onClientColumnSort={(changedSortedIndexMap: Array<number>) => setSortedIndexMap(changedSortedIndexMap)}
        onServerColumnSort={(columName: CardSortField, sortDirection: SortDirection) => props.onSortChanged(columName, sortDirection)}
        onDataSelected={
          (cards?: Array<LibraryCardListViewmodel>) => {
            props.onCardSelected(cards && cards.length > 0 ? cards[0].cardId : null);
          }
        }
        sortableColumnDefinitions={sortableColumnDefinitions}
        sortedIndexMap={sortedIndexMap}
        sortType="server"
      />
      <PagingView
        hasMore={queryResult.hasMore}
        currentPageNumber={queryResult.currentPageNumber}
        currentPageSize={queryResult.currentPageSize}
        currentPageChanged={(newPage: number) => props.onCurrentPageChanged(newPage)}
        currentPageSizeChanged={(newPageSize: number) => props.onCurrentPageSizeChanged(newPageSize)}
      />
    </div>
  );

  function getTableData(qryResult: QueryResultDto<LibraryCardListDto>, cardQuery: CardQueryParamsDto): Array<LibraryCardListViewmodel> {
    const result: Array<LibraryCardListViewmodel> = qryResult.resultList.map((c: LibraryCardListDto) => serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory.getMtgCardListViewmodel(c));
    switch (cardQuery.sortField) {
      case "cardName":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.cardName.localeCompare(y.cardName))
        );
        break;
      case "cmc":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.convertedManaCost - y.convertedManaCost)
        );
        break;
      case "collectorNumberSortValue":
        result.sort((a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue));
        break;
      case "colorIdentitiesSortValue":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.colorIdentitySortValue.localeCompare(y.colorIdentitySortValue))
        );
        break;
      case "power":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.power.localeCompare(y.power))
        );
      case "rarity":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.raritySortValue - y.raritySortValue)
        );
        break;
      case "setName":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.setName.localeCompare(y.setName))
        );
        break;
      case "toughness":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.toughness.localeCompare(y.toughness))
        );
        break;
      case "typeLine":
        result.sort(
          (a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => sortData(a, b, (x, y) => x.type.localeCompare(y.type)));
        break;
      default:
        result.sort((a: LibraryCardListViewmodel, b: LibraryCardListViewmodel) => a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue));
    }
    return cardQuery.sortDirection == "DESC" ? result.reverse() : result;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  function sortData(a: LibraryCardListViewmodel, b: LibraryCardListViewmodel, compareFn: ((x: LibraryCardListViewmodel, y: LibraryCardListViewmodel) => number)): number {
    let result: number = compareFn(a, b);
    if (result == 0) {
      result = a.collectorNumberSortValue.localeCompare(b.collectorNumberSortValue);
    }
    return result;
  }
  // #endregion
}
