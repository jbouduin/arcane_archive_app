import { ApiConfigurationDto } from "./api-configuration.dto";
import { DataConfigurationDto } from "./data-configuration.dto";
import { RendererConfigurationDto } from "./renderer-configuration.dto";

export type ConfigurationDto = {
  apiConfiguration: ApiConfigurationDto;
  dataConfiguration: DataConfigurationDto;
  rendererConfiguration: RendererConfigurationDto;
};
