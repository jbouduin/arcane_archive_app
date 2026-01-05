import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { IIpcProxyService, IServiceContainer } from "../../../context";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel;
  getSystemSettingsViewmodel(ipcProxy: IIpcProxyService, firstTime: boolean): Promise<SystemSettingsViewmodel>;
  getSystemSettingsViewmodelFromDto(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel;
  getSystemInfoViewmodel(serviceContainer: IServiceContainer): SystemInfoViewmodel;
}
