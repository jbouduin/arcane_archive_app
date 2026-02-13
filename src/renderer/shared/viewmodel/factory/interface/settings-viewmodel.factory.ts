import { PreferencesDto, SystemConfigurationDto } from "../../../../../common/dto";
import { ApiInfoContextType } from "../../../context";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel;
  getSystemSettingsViewmodel(configuration: SystemConfigurationDto, firstTime: boolean): SystemSettingsViewmodel;
  getSystemSettingsViewmodelFromDto(dto: SystemConfigurationDto, firstTime: boolean): SystemSettingsViewmodel;
  getSystemInfoViewmodel(apiInfo: ApiInfoContextType): SystemInfoViewmodel;
}
