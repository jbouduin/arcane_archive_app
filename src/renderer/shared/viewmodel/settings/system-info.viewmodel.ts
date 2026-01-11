import { ApiInfoDto, SystemInfoDto } from "../../dto";
import { MtgServer } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

/**
 * SystemInfoViewmodel, defined as BaseViewmodel subclass because it is used in a dialog
 */
export class SystemInfoViewmodel extends BaseViewmodel<SystemInfoDto, string> {
  // #region Getters/Setters --------------------------------------------------
  public get apiRoots(): Map<MtgServer, string> {
    return this._dto.apiRoots;
  }

  public get apiStatus(): Map<MtgServer, ApiInfoDto | null> {
    return this._dto.apiStatus;
  }
  // #endregion
}
