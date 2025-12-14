import { ApiConfigurationDto, PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { IConfigurationService, IIpcProxyService } from "../interface";
import { PreferencesChangeListener } from "../providers";

export class ConfigurationService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  private _apiConfiguration!: ApiConfigurationDto;
  private _preferences!: PreferencesDto;
  private listeners: Array<PreferencesChangeListener>;
  // #endregion

  // #region IConfiguration Getters -------------------------------------------
  public get apiConfiguration(): ApiConfigurationDto {
    return this._apiConfiguration;
  }

  public get preferences(): PreferencesDto {
    return this._preferences;
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.listeners = new Array<PreferencesChangeListener>();
  }
  // #endregion

  // #region IConfiguration Members -------------------------------------------
  public initialize(ipcProxy: IIpcProxyService): Promise<SettingsDto> {
    this.ipcProxy = ipcProxy;
    return this.ipcProxy.getData<SettingsDto>("/settings")
      .then(
        (settings: SettingsDto) => {
          this._apiConfiguration = settings.apiConfiguration;
          this._preferences = settings.preferences;
          ipcProxy.logServerResponses = settings.preferences.logServerResponses;
          return settings;
        }
      );
  }

  public saveConfiguration(configuration: SystemSettingsDto): Promise<SystemSettingsDto> {
    return this.ipcProxy
      .postData<SystemSettingsDto, SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS, configuration)
      .then(
        (saved: SystemSettingsDto) => {
          return saved;
        },
        () => configuration
      );
  }

  public updateLocalPreferences(preferences: PreferencesDto): Promise<PreferencesDto> {
    return this.ipcProxy
      .postData<PreferencesDto, PreferencesDto>(IpcPaths.PREFERENCES, preferences)
      .then(
        (saved: PreferencesDto) => {
          this._preferences = saved;
          return saved;
        },
        () => preferences
      );
  }

  public subscribe(listener: PreferencesChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  // #endregion
}
