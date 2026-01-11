import { SetTreeSettingsDto } from "../../../../common/dto";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";
import { SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class SetTreeSettingsViewmodel extends BaseViewmodel<SetTreeSettingsDto, string> {
  // #region Private fields ---------------------------------------------------
  private readonly _cardSetSortOptions: Array<SelectOption<CardSetSort>>;
  private readonly _cardSetGroupByOptions: Array<SelectOption<CardSetGroupBy>>;
  // #endregion

  // #region BaseViewmodel Members ----------------------------------------------
  public get isValid(): boolean {
    return true;
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get cardSetSort(): CardSetSort {
    return this._dto.cardSetSort;
  }

  public set cardSetSort(value: CardSetSort) {
    this._dto.cardSetSort = value;
  }

  public get cardSetSortOptions(): Array<SelectOption<CardSetSort>> {
    return this._cardSetSortOptions;
  }

  public get cardSetGroupBy(): CardSetGroupBy {
    return this._dto.cardSetGroupBy;
  }

  public set cardSetGroupBy(value: CardSetGroupBy) {
    this._dto.cardSetGroupBy = value;
  }

  public get cardSetGroupByOptions(): Array<SelectOption<CardSetGroupBy>> {
    return this._cardSetGroupByOptions;
  }

  public get cardSetTypeFilter(): Array<string> {
    return this._dto.cardSetTypeFilter;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dtoConfiguration: SetTreeSettingsDto) {
    super(dtoConfiguration);
    this._cardSetSortOptions = [
      { value: "releaseDateAscending", label: "Release Date Ascending" },
      { value: "releaseDateDescending", label: "Release Date Descending" },
      { value: "alphabeticallyAscending", label: "Alphabetically Ascending" },
      { value: "alphabeticallyDescending", label: "Alphabetically Descending" }
    ];
    this._cardSetGroupByOptions = [
      { value: "none", label: "No grouping" },
      { value: "parent", label: "Parent" },
      { value: "block", label: "Block" },
      { value: "setType", label: "Set Type" }
    ];
    dtoConfiguration.cardSetTypeFilter.sort();
  }
  // #endregion

  // #region Public methods ---------------------------------------------------
  public toggleCardSetFilterType(cardSetType: string): void {
    const indexOfType = this._dto.cardSetTypeFilter.indexOf(cardSetType);
    if (indexOfType >= 0) {
      this._dto.cardSetTypeFilter.splice(indexOfType, 1);
    } else {
      this._dto.cardSetTypeFilter.push(cardSetType);
      this._dto.cardSetTypeFilter.sort();
    }
  }
  // #endregion
}
