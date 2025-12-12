import { Classes } from "@blueprintjs/core";
import { SettingsDto } from "../../../../common/dto";
import { BaseViewmodel } from "../base.viewmodel";
import { SetTreeSettingsViewmodel } from "../settings/set-tree-settings.viewmodel";
import { DataConfigurationViewmodel } from "./data-configuration.viewmodel";

// TODO get rid of this class
export class ConfigurationViewModel extends BaseViewmodel<SettingsDto> {
  // #region private fields ---------------------------------------------------
  private _databaseViewTreeConfigurationViewmodel: SetTreeSettingsViewmodel;
  private _dataConfigurationViewmodel: DataConfigurationViewmodel;
  private readonly _isFirstUse: boolean;
  // #endregion

  // #region BaseViewmodel Members ----------------------------------------------
  public get isValid(): boolean {
    return this._databaseViewTreeConfigurationViewmodel.isValid && this._dataConfigurationViewmodel.isValid;
  }
  // #endregion

  // #region Auxiliary getters ------------------------------------------------
  public override get hasChanges(): boolean {
    return this._isFirstUse || super.hasChanges;
  }

  public get isFirstUse(): boolean {
    return this._isFirstUse;
  }
  // #endregion

  // #region Getters/Setters --------------------------------------------------
  public get theme(): string {
    return this._dto.preferences.useDarkTheme ? Classes.DARK : "";
  }

  public get databaseViewConfigurationViewmodel(): SetTreeSettingsViewmodel {
    return this._databaseViewTreeConfigurationViewmodel;
  }

  public set databaseViewConfigurationViewmodel(value: SetTreeSettingsViewmodel) {
    this._databaseViewTreeConfigurationViewmodel = value;
    this._dto.preferences.librarySetTreeSettings = value.dto;
  }

  public get dataConfigurationViewmodel(): DataConfigurationViewmodel {
    return this._dataConfigurationViewmodel;
  }

  public set dataConfigurationViewmodel(value: DataConfigurationViewmodel) {
    this._dataConfigurationViewmodel = value;
    this._dto.systemConfiguration.dataConfiguration = value.dto;
  }
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(dtoConfiguration: SettingsDto, isFirstUse: boolean) {
    super(dtoConfiguration);
    this._isFirstUse = isFirstUse;
    this._databaseViewTreeConfigurationViewmodel = new SetTreeSettingsViewmodel(dtoConfiguration.preferences.librarySetTreeSettings);
    this._dataConfigurationViewmodel = new DataConfigurationViewmodel(dtoConfiguration.systemConfiguration.dataConfiguration);
  }
  // #endregion
}
