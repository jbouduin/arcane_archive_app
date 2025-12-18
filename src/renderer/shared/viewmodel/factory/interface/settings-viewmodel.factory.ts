import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { PreferencesViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel;
  getSystemSettingsViewmodel(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel;
}
