import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { BaseLookupResult, GenericTextColumn, IBaseColumn } from "../../../../shared/components/base/base-table";
import { CardSetColumn, CardTableView, CollectiorNumberColumn, ColorIdentityColumn, ManaCostColumn } from "../../../../shared/components/card-table-view";
import { LibraryCardListDto } from "../../../../shared/dto";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel/mtg-card";
import { LibraryViewCenterProps } from "./library-view-center.props";

export function LibraryViewCenter(props: LibraryViewCenterProps) {
  // #region State ------------------------------------------------------------
  const [cards, setCards] = React.useState<Array<LibraryCardListViewmodel>>(new Array<LibraryCardListViewmodel>());
  const [sortedIndexMap, setSortedIndexMap] = React.useState<Array<number>>(new Array<number>());
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      void serviceContainer.collectionManagerProxy.getData<Array<LibraryCardListDto>>("/card/list?pageNumber=0")
        .then(
          (data: Array<LibraryCardListDto>) => setCards(data.map((c: LibraryCardListDto) => serviceContainer.viewmodelFactoryService.mtgCardViewmodelFactory.getMtgCardListViewmodel(c))),
          () => new Array<LibraryCardListViewmodel>())
        .then(() => setSortedIndexMap(new Array<number>()));
    },
    [props.selectedSets]
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
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, displayValue: card.collectorNumber };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Rarity",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.rarityDisplayValue };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Name",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.cardName };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Type",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.type };
        }
      ));
      result.push(new ManaCostColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Mana cost",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, convertedManaCost: card.convertedManaCost, symbols: card.manaCost };
        }
      ));
      result.push(new CardSetColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Set",
        (card: LibraryCardListViewmodel) => {
          return {
            defaultSortColumn: card.collectorNumberSortValue, cardSetName: card.setName, keyruneCode: card.setKeyruneCode, rarity: card.rarity
          };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Power",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.power };
        }
      ));
      result.push(new GenericTextColumn<LibraryCardListViewmodel>(
        columNumber++,
        "Thoughness",
        (card: LibraryCardListViewmodel) => {
          return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.thoughness };
        }
      ));
      result.push(new ColorIdentityColumn<LibraryCardListViewmodel>(
        columNumber++,
        "CI",
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
    <div>
      <CardTableView<LibraryCardListViewmodel>
        // bodyContextMenuRenderer={(context: MenuContext) => contextMenu(context)}
        data={cards}
        onColumnSorted={(changedSortedIndexMap: Array<number>) => setSortedIndexMap(changedSortedIndexMap)}
        onDataSelected={
          (cards?: Array<LibraryCardListViewmodel>) => {
            props.onCardSelected(cards && cards.length > 0 ? cards[0].cardId : null);
          }
        }
        sortableColumnDefinitions={sortableColumnDefinitions}
        sortedIndexMap={sortedIndexMap}
      />
    </div>
  );
  // #endregion
}
