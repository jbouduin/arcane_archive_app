import { Classes } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";
import { BaseViewmodel } from "../base.viewmodel";
import { DataConfigurationViewmodel } from "./data-configuration.viewmodel";
import { MtgViewTreeConfigurationViewmodel } from "./mtg-view-tree-configuration.viewmodel";

export class ConfigurationViewModel extends BaseViewmodel<ConfigurationDto> {
  // #region private fields ---------------------------------------------------
  private _databaseViewTreeConfigurationViewmodel: MtgViewTreeConfigurationViewmodel;
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
    return this._dto.rendererConfiguration.useDarkTheme ? Classes.DARK : "";
  }

  public get databaseViewConfigurationViewmodel(): MtgViewTreeConfigurationViewmodel {
    return this._databaseViewTreeConfigurationViewmodel;
  }

  public set databaseViewConfigurationViewmodel(value: MtgViewTreeConfigurationViewmodel) {
    this._databaseViewTreeConfigurationViewmodel = value;
    this._dto.rendererConfiguration.mtgSetTreeViewConfiguration = value.dto;
  }

  public get dataConfigurationViewmodel(): DataConfigurationViewmodel {
    return this._dataConfigurationViewmodel;
  }

  public set dataConfigurationViewmodel(value: DataConfigurationViewmodel) {
    this._dataConfigurationViewmodel = value;
    this._dto.dataConfiguration = value.dto;
  }
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(dtoConfiguration: ConfigurationDto, isFirstUse: boolean) {
    super(dtoConfiguration);
    this._isFirstUse = isFirstUse;
    this._databaseViewTreeConfigurationViewmodel = new MtgViewTreeConfigurationViewmodel(dtoConfiguration.rendererConfiguration.mtgSetTreeViewConfiguration);
    this._dataConfigurationViewmodel = new DataConfigurationViewmodel(dtoConfiguration.dataConfiguration);
  }
  // #endregion
}
