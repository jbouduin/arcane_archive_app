import { PreferencesDto, SystemConfigurationDto } from "../../../../../common/dto";
import { ApiInfoContextType } from "../../../context";
import { SystemInfoDto } from "../../../dto";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";
import { ISettingsViewmodelFactory } from "../interface";

export class SettingsViewmodelFactory implements ISettingsViewmodelFactory {
  // #region ISettingsViewmodelFactory Members --------------------------------
  public getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel {
    return new PreferencesViewmodel(dto);
  }

  public getSystemSettingsViewmodel(
    configuration: SystemConfigurationDto,
    firstTime: boolean
  ): SystemSettingsViewmodel {
    return this.getSystemSettingsViewmodelFromDto(configuration, firstTime);
  }

  public getSystemSettingsViewmodelFromDto(
    dto: SystemConfigurationDto,
    firstTime: boolean
  ): SystemSettingsViewmodel {
    return new SystemSettingsViewmodel(dto, firstTime ? "create" : "update");
  }

  public getSystemInfoViewmodel(apiInfo: ApiInfoContextType): SystemInfoViewmodel {
    const dto: SystemInfoDto = {
      apiRoots: apiInfo.apiRoots,
      apiStatus: apiInfo.apiStatus
    };
    return new SystemInfoViewmodel(dto);
  }
  // #endregion
}
