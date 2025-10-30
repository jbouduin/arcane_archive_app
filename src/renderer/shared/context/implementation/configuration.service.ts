import { noop } from "lodash";
import { ConfigurationDto, RendererConfigurationDto } from "../../../../common/dto";
import { IIpcProxyService } from "../interface";
import { IConfigurationService } from "../interface/configuration.service";
import { IpcProxyService } from "./ipc-proxy.service";

export class ConfigurationService implements IConfigurationService {
  private ipcProxy!: IIpcProxyService;
  private _configuration!: ConfigurationDto;

  public constructor() { }

  public get configuration(): ConfigurationDto {
    return this._configuration;
  }

  public get rendererConfiguration(): RendererConfigurationDto {
    return this._configuration.rendererConfiguration;
  }

  public initialize(ipcProxy: IpcProxyService): Promise<void> {
    this.ipcProxy = ipcProxy;
    return this.ipcProxy.getData<ConfigurationDto>("/configuration")
      .then(
        (configuration: ConfigurationDto) => { this._configuration = configuration },
        noop
      );
  }

  public saveConfiguration(configuration: ConfigurationDto): Promise<ConfigurationDto> {
    return this.ipcProxy
      .postData<ConfigurationDto, ConfigurationDto>("/configuration", configuration)
      .then(
        (saved: ConfigurationDto) => {
          this._configuration = saved;
          return saved
        },
        () => configuration
      );
  }
}