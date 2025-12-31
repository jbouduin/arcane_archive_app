import { PreferencesDto } from "../../../../common/dto";
import { ScryfallImageSize } from "../../../../common/enums";
import { CachedImageSize } from "../../../../common/types";
import { SortDirection } from "../../components/base/base-table";
import { CardSortField, SelectOption } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";
import { SetTreeSettingsViewmodel } from "./set-tree-settings.viewmodel";

export class PreferencesViewmodel extends BaseViewmodel<PreferencesDto> {
  // #region Private fields ---------------------------------------------------
  private _librarySetTreeSettingsViewmodel: SetTreeSettingsViewmodel;
  private readonly _cachedImageSizeOptions: Array<SelectOption<CachedImageSize>>;
  private readonly _pageSizeOptions: Array<SelectOption<number>>;
  private readonly _cardSortFieldOptions: Array<SelectOption<CardSortField>>;
  private readonly _sortDirectionOptions: Array<SelectOption<SortDirection>>;
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

  public get defaultPageSize(): number {
    return this._dto.defaultPageSize;
  }

  public set defaultPageSize(value: number) {
    this._dto.defaultPageSize = value;
  }

  public get defaultCardSortField(): CardSortField {
    return this._dto.defaultCardSortField;
  }

  public set defaultCardSortField(value: CardSortField) {
    this._dto.defaultCardSortField = value;
  }

  public get defaultCardSortDirection(): SortDirection {
    return this._dto.defaultCardSortDirection;
  }

  public set defaultCardSortDirection(value: SortDirection) {
    this._dto.defaultCardSortDirection = value;
  }
  // #endregion

  // #region Getters - Options lists ------------------------------------------
  public get cachedImageSizeOptions(): Array<SelectOption<CachedImageSize>> {
    return this._cachedImageSizeOptions;
  }

  public get pageSizeOptions(): Array<SelectOption<number>> {
    return this._pageSizeOptions;
  }

  public get cardSortFieldOptions(): Array<SelectOption<CardSortField>> {
    return this._cardSortFieldOptions;
  }

  public get sortDirectionOptions(): Array<SelectOption<SortDirection>> {
    return this._sortDirectionOptions;
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
    this._pageSizeOptions = [
      { label: "50 (default)", value: 50 },
      { label: "100", value: 100 },
      { label: "200", value: 200 }
    ];
    this._cardSortFieldOptions = [
      { label: "Collector Number (default)", value: "collectorNumberSortValue" },
      { label: "Rarity", value: "rarity" },
      { label: "Card Name", value: "cardName" },
      { label: "Type", value: "typeLine" },
      { label: "Converted Mana Cost", value: "cmc" },
      { label: "Set", value: "setName" },
      { label: "Power", value: "power" },
      { label: "Thoughness", value: "toughness" },
      { label: "Color Identity", value: "colorIdentitiesSortValue" }
    ];
    this._sortDirectionOptions = [
      { label: "Ascending (default)", value: "ASC" },
      { label: "Descending", value: "DESC" }
    ];
  }
  // #endregion
}
