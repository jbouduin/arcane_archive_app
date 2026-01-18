import { LogLevel } from "../../enums";
import { MainLogSetting, ResponseLogSetting } from "../../types";
import { DataConfigurationDto } from "./data-configuration.dto";

export type SystemConfigurationDto = {
  discovery: string;
  dataConfiguration: DataConfigurationDto;
  mainLoggingConfiguration: Array<MainLogSetting>;
  rendererLogLevel: LogLevel;
  responseLoggingConfiguration: Array<ResponseLogSetting>;
};
