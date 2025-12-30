import { PreferencesDto } from "../../../../common/dto";
import { ScryfallImageSize } from "../../../../common/enums";
import { CachedImageSize } from "../../../../common/types";
import { SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";
import { SetTreeSettingsViewmodel } from "./set-tree-settings.viewmodel";

export class PreferencesViewmodel extends BaseViewmodel<PreferencesDto> {
  // #region Private fields ---------------------------------------------------
  private _librarySetTreeSettingsViewmodel: SetTreeSettingsViewmodel;
  private readonly _cachedImageSizeOptions: Array<SelectOption<CachedImageSize>>;
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

  public get cachedImageSize(): CachedImageSize {
    return this._dto.cachedImageSize;
  }

  public set cachedImageSize(value: CachedImageSize) {
    this._dto.cachedImageSize = value;
  }

  public get cachedImageSizeOptions(): Array<SelectOption<CachedImageSize>> {
    return this._cachedImageSizeOptions;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor(dto: PreferencesDto) {
    super(dto);
    this._librarySetTreeSettingsViewmodel = new SetTreeSettingsViewmodel(dto.librarySetTreeSettings);
    this._cachedImageSizeOptions = [
      { value: ScryfallImageSize.NORMAL, label: "Normal (default) - 488 x 680" },
      { value: ScryfallImageSize.LARGE, label: "Large - 672 x 936" },
      { value: ScryfallImageSize.PNG, label: "High-res - 745 x 1040" }
    ];
  }
  // #endregion
}
