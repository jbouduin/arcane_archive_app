import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { PreferencesViewmodel, SystemSettingsViewmodel } from "../../settings";
import { ISettingsViewmodelFactory } from "../interface";

export class SettingsViewmodelFactory implements ISettingsViewmodelFactory {
  // #region ISettingsViewmodelFactory Members --------------------------------
  public getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel {
    return new PreferencesViewmodel(dto);
  }

  public getSystemSettingsViewmodel(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel {
    return new SystemSettingsViewmodel(dto, firstTime);
  }
  // #endregion
}
