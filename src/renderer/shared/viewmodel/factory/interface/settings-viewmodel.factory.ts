import { PreferencesViewmodel, SystemSettingsViewmodel } from "../../settings";

export interface ISettingsViewmodelFactory {
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  getPreferencesViewmodel(dto: String): PreferencesViewmodel;
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  getSystemSettingsViewmodel(dto: String): SystemSettingsViewmodel;
}
