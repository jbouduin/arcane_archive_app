import { PreferencesDto } from "../../../../common/dto";
import { ScryfallImageSize } from "../../../../common/enums";
import { BaseViewmodelNew } from "../base.viewmodel-new";
import { SetTreeSettingsViewmodel } from "./set-tree-settings.viewmodel";

export class PreferencesViewmodel extends BaseViewmodelNew<PreferencesDto> {
  // #region Private fields ---------------------------------------------------
  private _librarySetTreeSettingsViewmodel: SetTreeSettingsViewmodel;
  // #endregion

  // #region BaseViewmodel Members --------------------------------------------
  public get isValid(): boolean {
    return super.isValid && this._librarySetTreeSettingsViewmodel.isValid;
  }

  override cancelChanges(): void {
    super.cancelChanges();
    this._librarySetTreeSettingsViewmodel = new SetTreeSettingsViewmodel(this._dto.librarySetTreeSettings);
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get librarySetTreeSettingsViewmodel(): SetTreeSettingsViewmodel {
    return this._librarySetTreeSettingsViewmodel;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: PreferencesDto) {
    super(dto);
    this._librarySetTreeSettingsViewmodel = new SetTreeSettingsViewmodel(dto.librarySetTreeSettings);
    this.registerSelectOptions(
      "cachedImageSize",
      [
        { value: ScryfallImageSize.NORMAL, label: "Normal (default) - 488 x 680" },
        { value: ScryfallImageSize.LARGE, label: "Large - 672 x 936" },
        { value: ScryfallImageSize.PNG, label: "High-res - 745 x 1040" }
      ]);
    this.registerSelectOptions(
      "defaultPageSize",
      [
        { label: "50 (default)", value: 50 },
        { label: "100", value: 100 },
        { label: "200", value: 200 }
      ]
    );
    this.registerSelectOptions(
      "defaultCardSortField", [
      { label: "Collector Number (default)", value: "collectorNumberSortValue" },
      { label: "Rarity", value: "rarity" },
      { label: "Card Name", value: "cardName" },
      { label: "Type", value: "typeLine" },
      { label: "Converted Mana Cost", value: "cmc" },
      { label: "Set", value: "setName" },
      { label: "Power", value: "power" },
      { label: "Thoughness", value: "toughness" },
      { label: "Color Identity", value: "colorIdentitiesSortValue" }
    ]
    );
    this.registerSelectOptions(
      "defaultCardSortField",
      [
        { label: "Ascending (default)", value: "ASC" },
        { label: "Descending", value: "DESC" }
      ]
    );
  }
  // #endregion
}
