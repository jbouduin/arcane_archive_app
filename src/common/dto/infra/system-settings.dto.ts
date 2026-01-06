import { LogSetting } from "../../types";
import { DataConfigurationDto } from "./data-configuration.dto";

export type SystemSettingsDto = {
  discovery: string;
  dataConfiguration: DataConfigurationDto;
  loggingConfiguration: Array<LogSetting>;
};
