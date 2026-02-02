import { ArcaneArchiveServer } from "../../../../common/types";
import { ApiInfoDto, SystemInfoDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

/**
 * SystemInfoViewmodel, defined as BaseViewmodel subclass because it is used in a dialog
 */
export class SystemInfoViewmodel extends BaseViewmodel<SystemInfoDto> {
  // #region Getters/Setters --------------------------------------------------
  public get apiRoots(): Map<ArcaneArchiveServer, string> {
    return this._dto.apiRoots;
  }

  public get apiStatus(): Map<ArcaneArchiveServer, ApiInfoDto | null> {
    return this._dto.apiStatus;
  }
  // #endregion
}
