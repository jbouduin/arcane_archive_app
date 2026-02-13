import { AbstractCardListViewmodel } from "../../viewmodel/abstract-card-list.viewmodel";
import { GenericTextColumn } from "../base/base-table";
import { CardSetColumn } from "./card-set-column";
import { CollectiorNumberColumn } from "./collector-number-column";
import { ColorIdentityColumn } from "./color-identity-column";
import { ManaCostColumn } from "./mana-cost-column";

export class SortableColumnsFactory<T extends AbstractCardListViewmodel> {
  //#region Factory methods ---------------------------------------------------
  public getCollectorNumberColumn(columNumber: number): CollectiorNumberColumn<T> {
    return new CollectiorNumberColumn<T>(
      columNumber,
      "Number",
      "collectorNumberSortValue",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, displayValue: card.collectorNumber };
      }
    );
  }

  public getRarityColumn(columNumber: number): GenericTextColumn<T> {
    return new GenericTextColumn<T>(
      columNumber,
      "Rarity",
      "rarity",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.rarityDisplayValue };
      }
    );
  }

  public getNameColumn(columNumber: number): GenericTextColumn<T> {
    return new GenericTextColumn<T>(
      columNumber,
      "Name",
      "cardName",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.cardName };
      }
    );
  }

  public getTypeColumn(columNumber: number): GenericTextColumn<T> {
    return new GenericTextColumn<T>(
      columNumber++,
      "Type",
      "typeLine",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.type };
      }
    );
  }

  public getManaCostColumn(columNumber: number): ManaCostColumn<T> {
    return new ManaCostColumn<T>(
      columNumber,
      "Mana cost",
      "cmc",
      (card: T) => {
        return {
          defaultSortColumn: card.collectorNumberSortValue,
          convertedManaCost: card.convertedManaCost,
          symbols: card.manaCost
        };
      }
    );
  }

  public getCardSetColumn(columNumber: number): CardSetColumn<T> {
    return new CardSetColumn<T>(
      columNumber,
      "Set",
      "setName",
      (card: T) => {
        return {
          defaultSortColumn: card.collectorNumberSortValue,
          cardSetName: card.setName,
          keyruneCode: card.setKeyruneCode,
          rarity: card.rarity
        };
      }
    );
  }

  public getPowerColumn(columNumber: number): GenericTextColumn<T> {
    return new GenericTextColumn<T>(
      columNumber,
      "Power",
      "power",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.power };
      }
    );
  }

  public getToughnessColumn(columNumber: number): GenericTextColumn<T> {
    return new GenericTextColumn<T>(
      columNumber,
      "Toughness",
      "toughness",
      (card: T) => {
        return { defaultSortColumn: card.collectorNumberSortValue, textValue: card.toughness };
      }
    );
  }

  public getColorIdentityColumn(columNumber: number): ColorIdentityColumn<T> {
    return new ColorIdentityColumn<T>(
      columNumber,
      "CI",
      "colorIdentitiesSortValue",
      (card: T) => {
        return {
          defaultSortColumn: card.collectorNumberSortValue,
          colorIdentitySortValue: card.colorIdentitySortValue,
          symbols: card.colorIdentity
        };
      }
    );
  }
  //#endregion
}
