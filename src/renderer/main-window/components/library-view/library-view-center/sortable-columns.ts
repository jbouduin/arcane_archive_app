import {
  BaseLookupResult, GenericTextColumn, IBaseColumn
} from "../../../../shared/components/base/base-table";
import {
  CardSetColumn, CollectiorNumberColumn, ColorIdentityColumn, ManaCostColumn
} from "../../../../shared/components/card-table-view";
import { LibraryCardListViewmodel } from "../../../../shared/viewmodel";

export function getSortableColumns(): Array<IBaseColumn<LibraryCardListViewmodel, BaseLookupResult>> {
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
      return {
        defaultSortColumn: card.collectorNumberSortValue,
        convertedManaCost: card.convertedManaCost,
        symbols: card.manaCost
      };
    }
  ));
  result.push(new CardSetColumn<LibraryCardListViewmodel>(
    columNumber++,
    "Set",
    "setName",
    (card: LibraryCardListViewmodel) => {
      return {
        defaultSortColumn: card.collectorNumberSortValue,
        cardSetName: card.setName,
        keyruneCode: card.setKeyruneCode,
        rarity: card.rarity
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
}
