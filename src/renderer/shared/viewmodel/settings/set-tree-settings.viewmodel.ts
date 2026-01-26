import { SetTreeSettingsDto } from "../../../../common/dto";
import { BaseViewmodel } from "../base.viewmodel";

export class SetTreeSettingsViewmodel extends BaseViewmodel<SetTreeSettingsDto> {
  // #region Getters/Setters --------------------------------------------------
  public get cardSetTypeFilter(): Array<string> {
    return this._dto.cardSetTypeFilter;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dtoConfiguration: SetTreeSettingsDto) {
    super(dtoConfiguration);
    this.registerSelectOptions(
      "cardSetSort",
      [
        { value: "releaseDateAscending", label: "Release Date Ascending" },
        { value: "releaseDateDescending", label: "Release Date Descending" },
        { value: "alphabeticallyAscending", label: "Alphabetically Ascending" },
        { value: "alphabeticallyDescending", label: "Alphabetically Descending" }
      ]
    );
    this.registerSelectOptions(
      "cardSetGroupBy",
      [
        { value: "none", label: "No grouping" },
        { value: "parent", label: "Parent" },
        { value: "block", label: "Block" },
        { value: "setType", label: "Set Type" }
      ]
    );
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
