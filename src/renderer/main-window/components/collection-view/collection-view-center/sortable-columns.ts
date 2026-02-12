import { IBaseColumn, BaseLookupResult, GenericTextColumn, GenericNumericColumn } from "../../../../shared/components/base/base-table";
import {
  CollectiorNumberColumn, ManaCostColumn, CardSetColumn, ColorIdentityColumn
} from "../../../../shared/components/card-table-view";
import { CollectionCardListViewmodel } from "../../../../shared/viewmodel";

export function sortableColumns(): Array<IBaseColumn<CollectionCardListViewmodel, BaseLookupResult>> {
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
    "Collection",
    null,
    (card: CollectionCardListViewmodel) => {
      return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.collection };
    }
  ));
  result.push(new GenericNumericColumn<CollectionCardListViewmodel>(
    columNumber++,
    "Quantity",
    null,
    (card: CollectionCardListViewmodel) => {
      return { defaultSortColumn: card.collectorNumberSortValue, numericValue: card.quantity };
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
}
