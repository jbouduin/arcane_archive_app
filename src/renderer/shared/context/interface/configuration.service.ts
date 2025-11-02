import { ConfigurationDto, RendererConfigurationDto } from "../../../../common/dto";
import { IIpcProxyService } from "./ipc-proxy.service";

export interface IConfigurationService {
  readonly configuration: ConfigurationDto;
  readonly rendererConfiguration: RendererConfigurationDto;

  initialize(ipcProx: IIpcProxyService): Promise<ConfigurationDto>;
  saveConfiguration(configuration: ConfigurationDto): Promise<ConfigurationDto>;
}
