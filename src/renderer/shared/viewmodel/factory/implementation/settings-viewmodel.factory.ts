import { PreferencesViewmodel, SystemSettingsViewmodel } from "../../settings";
import { ISettingsViewmodelFactory } from "../interface/settings-viewmodel.factory";

export class SettingsViewmodelFactory implements ISettingsViewmodelFactory {
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  public getPreferencesViewmodel(dto: String): PreferencesViewmodel {
    return new PreferencesViewmodel(dto);
  }

  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  public getSystemSettingsViewmodel(dto: String): SystemSettingsViewmodel {
    return new SystemSettingsViewmodel(dto);
  }
}
