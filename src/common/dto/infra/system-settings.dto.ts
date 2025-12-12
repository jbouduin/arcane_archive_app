import { ApiConfigurationDto } from "./api-configuration.dto";
import { DataConfigurationDto } from "./data-configuration.dto";

export type SystemSettingsDto = {
  apiConfiguration: ApiConfigurationDto;
  dataConfiguration: DataConfigurationDto;
};
