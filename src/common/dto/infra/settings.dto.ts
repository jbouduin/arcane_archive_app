import { ApiConfigurationDto } from "./api-configuration.dto";
import { PreferencesDto } from "./preferences.dto";
import { SystemConfigurationDto } from "./system-configuration.dto";

/**
 * This dto is to be used when retrieving the settings for the renderer
 */
export type SettingsDto = {
  apiConfiguration: ApiConfigurationDto | null;
  preferences: PreferencesDto;
  systemConfiguration: SystemConfigurationDto;
};
