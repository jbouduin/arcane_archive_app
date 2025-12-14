import { DataConfigurationDto } from "./data-configuration.dto";

export type SystemSettingsDto = {
  discovery: string;
  dataConfiguration: DataConfigurationDto;
};
