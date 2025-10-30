import { DataConfigurationDto } from "./data-configuration.dto";
import { RendererConfigurationDto } from "./renderer-configuration.dto";

export type ConfigurationDto = {
  dataConfiguration: DataConfigurationDto;
  rendererConfiguration: RendererConfigurationDto;
}