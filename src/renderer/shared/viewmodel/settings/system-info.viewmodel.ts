import { ApiInfoDto, SystemInfoDto } from "../../dto";
import { MtgServer } from "../../types";
import { BaseViewmodel } from "../base.viewmodel";

export class SystemInfoViewmodel extends BaseViewmodel<SystemInfoDto> {
  // #region Getters/Setters --------------------------------------------------
  public get apiRoots(): Map<MtgServer, string> {
    return this._dto.apiRoots;
  }

  public get apiStatus(): Map<MtgServer, ApiInfoDto | null> {
    return this._dto.apiStatus;
  }
  // #endregion
}
