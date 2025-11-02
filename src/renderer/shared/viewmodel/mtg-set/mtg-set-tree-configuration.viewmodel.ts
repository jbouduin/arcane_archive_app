import { MtgSetTreeViewConfigurationDto } from "../../../../common/dto";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";

export class MtgSetTreeConfigurationViewmodel {
  // #region Private fields ---------------------------------------------------
  private _cardSetSort: CardSetSort;
  private _cardSetGroupBy: CardSetGroupBy;
  private _cardSetTypeFilter: Array<string>;
  private _cardSetFilterValue: string | null;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get cardSetSort(): CardSetSort {
    return this._cardSetSort;
  }

  public set cardSetSort(value: CardSetSort) {
    this._cardSetSort = value;
  }

  public get cardSetGroupBy(): CardSetGroupBy {
    return this._cardSetGroupBy;
  }

  public set cardSetGroupBy(value: CardSetGroupBy) {
    this._cardSetGroupBy = value;
  }

  public get cardSetFilterValue(): string | null {
    return this._cardSetFilterValue;
  }

  public set cardSetFilterValue(value: string | null) {
    this._cardSetFilterValue = value;
  }

  public get cardSetTypeFilter(): Array<string> {
    return this._cardSetTypeFilter;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: MtgSetTreeViewConfigurationDto) {
    this._cardSetSort = dto.cardSetSort;
    this._cardSetGroupBy = dto.cardSetGroupBy;
    this._cardSetTypeFilter = dto.cardSetTypeFilter;
    this._cardSetFilterValue = null;
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public toggleCardSetFilterType(cardSetType: string): void {
    const indexOfType = this._cardSetTypeFilter.indexOf(cardSetType);
    if (indexOfType >= 0) {
      this._cardSetTypeFilter = this._cardSetTypeFilter
        .filter((ct: string) => ct != cardSetType);
    } else {
      this._cardSetTypeFilter.push(cardSetType);
    }
    this._cardSetFilterValue = null;
  }
  // #endregion
}
