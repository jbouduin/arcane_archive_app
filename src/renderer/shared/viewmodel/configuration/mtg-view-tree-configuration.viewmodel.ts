import { MtgSetTreeViewConfigurationDto } from "../../../../common/dto";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";
import { BaseViewmodel } from "../base.viewmodel";

export class MtgViewTreeConfigurationViewmodel extends BaseViewmodel<MtgSetTreeViewConfigurationDto> {
  // #region public fields ----------------------------------------------------
  public cardSetFilterValue: string | null;
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get cardSetSort(): CardSetSort {
    return this._dto.cardSetSort;
  }

  public set cardSetSort(value: CardSetSort) {
    this._dto.cardSetSort = value;
  }

  public get cardSetGroupBy(): CardSetGroupBy {
    return this._dto.cardSetGroupBy;
  }

  public set cardSetGroupBy(value: CardSetGroupBy) {
    this._dto.cardSetGroupBy = value;
  }

  public get cardSetTypeFilter(): Array<string> {
    return this._dto.cardSetTypeFilter;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dtoConfiguration: MtgSetTreeViewConfigurationDto) {
    super(dtoConfiguration);
    this.cardSetFilterValue = null;
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public toggleCardSetFilterType(cardSetType: string): void {
    const indexOfType = this._dto.cardSetTypeFilter.indexOf(cardSetType);
    if (indexOfType >= 0) {
      this._dto.cardSetTypeFilter = this._dto.cardSetTypeFilter
        .filter((ct: string) => ct != cardSetType);
    } else {
      this._dto.cardSetTypeFilter.push(cardSetType);
    }
    this.cardSetFilterValue = null;
  }
  // #endregion
}
