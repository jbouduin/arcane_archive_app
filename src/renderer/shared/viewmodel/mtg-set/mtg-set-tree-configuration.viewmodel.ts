import { SetTreeSettingsDto } from "../../../../common/dto";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";

export class MtgSetTreeConfigurationViewmodel {
  // #region Private fields ---------------------------------------------------
  private _cardSetSort: CardSetSort;
  private _cardSetGroupBy: CardSetGroupBy;
  private _cardSetTypeFilter: Set<string>;
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

  public get cardSetTypeFilter(): Set<string> {
    return this._cardSetTypeFilter;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: SetTreeSettingsDto) {
    this._cardSetSort = dto.cardSetSort;
    this._cardSetGroupBy = dto.cardSetGroupBy;
    this._cardSetTypeFilter = new Set<string>(dto.cardSetTypeFilter);
    this._cardSetFilterValue = null;
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public toggleCardSetFilterType(cardSetType: string): void {
    if (this.cardSetTypeFilter.has(cardSetType)) {
      this.cardSetTypeFilter.delete(cardSetType);
    } else {
      this.cardSetTypeFilter.add(cardSetType);
    }
    this.cardSetFilterValue = null;
  }
  // #endregion
}
