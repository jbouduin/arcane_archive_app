import { PreferencesDto, SystemConfigurationDto } from "../../../../../common/dto";
import { ApiInfoContextType, IIpcProxy } from "../../../context";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel;
  getSystemSettingsViewmodel(ipcProxy: IIpcProxy, firstTime: boolean): Promise<SystemSettingsViewmodel>;
  getSystemSettingsViewmodelFromDto(dto: SystemConfigurationDto, firstTime: boolean): SystemSettingsViewmodel;
  getSystemInfoViewmodel(apiInfo: ApiInfoContextType): SystemInfoViewmodel;
}
