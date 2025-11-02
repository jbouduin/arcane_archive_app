import { ConfigurationDto, RendererConfigurationDto } from "../../../../common/dto";
import { IConfigurationService, IIpcProxyService } from "../interface";

export class ConfigurationService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  private _configuration!: ConfigurationDto;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() { }
  // #endregion

  // #region IConfiguration Members -------------------------------------------
  public get configuration(): ConfigurationDto {
    return this._configuration;
  }

  public get rendererConfiguration(): RendererConfigurationDto {
    return this._configuration.rendererConfiguration;
  }

  public initialize(ipcProxy: IIpcProxyService): Promise<ConfigurationDto> {
    this.ipcProxy = ipcProxy;
    return this.ipcProxy.getData<ConfigurationDto>("/configuration")
      .then(
        (configuration: ConfigurationDto) => {
          this._configuration = configuration;
          ipcProxy.logServerResponses = configuration.rendererConfiguration.logServerResponses;
          return configuration;
        }
      );
  }

  public saveConfiguration(configuration: ConfigurationDto): Promise<ConfigurationDto> {
    return this.ipcProxy
      .postData<ConfigurationDto, ConfigurationDto>("/configuration", configuration)
      .then(
        (saved: ConfigurationDto) => {
          this._configuration = saved;
          return saved;
        },
        () => configuration
      );
  }
  // #endregion
}
