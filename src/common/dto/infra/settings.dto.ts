import { PreferencesDto } from "./preferences.dto";
import { SystemSettingsDto } from "./system-settings.dto";

export type SettingsDto = {
  systemConfiguration: SystemSettingsDto;
  preferences: PreferencesDto;
};
