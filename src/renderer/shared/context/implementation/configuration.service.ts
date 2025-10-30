import { noop } from "lodash";
import { ConfigurationDto, RendererConfigurationDto } from "../../../../common/dto";
import { IIpcProxyService } from "../interface";
import { IConfigurationService } from "../interface";

export class ConfigurationService implements IConfigurationService {
  //#region Private fields ----------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  private _configuration!: ConfigurationDto;
  //#endregion

  //#region Constructor -------------------------------------------------------
  public constructor() { }
  //#endregion

  //#region IConfiguration Members --------------------------------------------
  public get configuration(): ConfigurationDto {
    return this._configuration;
  }

  public get rendererConfiguration(): RendererConfigurationDto {
    return this._configuration.rendererConfiguration;
  }

  public initialize(ipcProxy: IIpcProxyService): Promise<void> {
    this.ipcProxy = ipcProxy;
    return this.ipcProxy.getData<ConfigurationDto>("/configuration")
      .then(
        (configuration: ConfigurationDto) => {
          this._configuration = configuration;
          ipcProxy.logServerResponses = configuration.rendererConfiguration.logServerResponses;
        },
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
  //#endregion
}