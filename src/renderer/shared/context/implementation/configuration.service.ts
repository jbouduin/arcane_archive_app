import { PreferencesDto, SettingsDto } from "../../../../common/dto";
import { IConfigurationService, IIpcProxyService } from "../interface";
import { PreferencesChangeListener } from "../providers";

export class ConfigurationService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  private _settings!: SettingsDto;
  private listeners: Array<PreferencesChangeListener>;
  // #endregion

  // #region IConfiguration Getters -------------------------------------------
  public get configuration(): SettingsDto {
    return this._settings;
  }

  public get preferences(): PreferencesDto {
    return this._settings.preferences;
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
    return this.ipcProxy.getData<SettingsDto>("/configuration")
      .then(
        (settings: SettingsDto) => {
          this._settings = settings;
          ipcProxy.logServerResponses = settings.preferences.logServerResponses;
          return settings;
        }
      );
  }

  public saveConfiguration(configuration: SettingsDto): Promise<SettingsDto> {
    return this.ipcProxy
      .postData<SettingsDto, SettingsDto>("/configuration", configuration)
      .then(
        (saved: SettingsDto) => {
          this._settings = saved;
          return saved;
        },
        () => configuration
      );
  }

  public updateLocalPreferences(preferences: PreferencesDto): Promise<PreferencesDto> {
    this._settings.preferences = preferences;
    return this.saveConfiguration(this._settings)
      .then(
        (saved: SettingsDto) => {
          this.listeners.forEach((l: PreferencesChangeListener) => l(saved.preferences));
          return saved.preferences;
        },
        () => this._settings.preferences
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
