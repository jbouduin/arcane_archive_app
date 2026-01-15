import { ApiInfoDto, SystemInfoDto } from "../../dto";
import { MtgServer } from "../../types";
import { BaseViewmodelNew } from "../base.viewmodel-new";

/**
 * SystemInfoViewmodel, defined as BaseViewmodel subclass because it is used in a dialog
 */
export class SystemInfoViewmodel extends BaseViewmodelNew<SystemInfoDto> {
  // #region Getters/Setters --------------------------------------------------
  public get apiRoots(): Map<MtgServer, string> {
    return this._dto.apiRoots;
  }

  public get apiStatus(): Map<MtgServer, ApiInfoDto | null> {
    return this._dto.apiStatus;
  }
  // #endregion
}
