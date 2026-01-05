import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel;
  getSystemSettingsViewmodel(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel;
  getSystemInfoViewmodel(serviceContainer: IServiceContainer): SystemInfoViewmodel;
}
