import { PreferencesDto } from "../../../../common/dto";
import { BaseViewmodel } from "../base.viewmodel";
import { SetTreeSettingsViewmodel } from "./set-tree-settings.viewmodel";

export class PreferencesViewmodel extends BaseViewmodel<PreferencesDto> {
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
  public get refreshCacheAtStartup(): boolean {
    return this._dto.refreshCacheAtStartup;
  }

  public set refreshCacheAtStartup(value: boolean) {
    this._dto.refreshCacheAtStartup = value;
  }

  public get useDarkTheme(): boolean {
    return this._dto.useDarkTheme;
  }

  public set useDarkTheme(value: boolean) {
    this._dto.useDarkTheme = value;
  }

  public get logServerResponses(): boolean {
    return this._dto.logServerResponses;
  }

  public set logServerResponses(value: boolean) {
    this._dto.logServerResponses = value;
  }

  public get librarySetTreeSettingsViewmodel(): SetTreeSettingsViewmodel {
    return this._librarySetTreeSettingsViewmodel;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: PreferencesDto) {
    super(dto);
    this._librarySetTreeSettingsViewmodel = new SetTreeSettingsViewmodel(dto.librarySetTreeSettings);
  }
  // #endregion
}
