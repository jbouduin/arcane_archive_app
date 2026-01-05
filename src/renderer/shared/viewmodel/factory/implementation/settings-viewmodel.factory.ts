import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { SystemInfoDto } from "../../../dto";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";
import { ISettingsViewmodelFactory } from "../interface";

export class SettingsViewmodelFactory implements ISettingsViewmodelFactory {
  // #region ISettingsViewmodelFactory Members --------------------------------
  public getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel {
    return new PreferencesViewmodel(dto);
  }

  public getSystemSettingsViewmodel(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel {
    return new SystemSettingsViewmodel(dto, firstTime);
  }

  public getSystemInfoViewmodel(serviceContainer: IServiceContainer): SystemInfoViewmodel {
    const dto: SystemInfoDto = {
      apiRoots: serviceContainer.arcaneArchiveProxy.apiRoots,
      apiStatus: serviceContainer.arcaneArchiveProxy.apiStatus
    };
    return new SystemInfoViewmodel(dto);
  }
  // #endregion
}
