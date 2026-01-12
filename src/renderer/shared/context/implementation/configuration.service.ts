import { PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { IArcaneArchiveProxyService, IConfigurationService, IIpcProxyService } from "../interface";
import { PreferencesChangeListener } from "../types";

export class ConfigurationService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxyService;
  private _preferences!: PreferencesDto;
  private listeners: Array<PreferencesChangeListener>;
  // #endregion

  // #region IConfiguration Getters -------------------------------------------
  public get preferences(): PreferencesDto {
    return this._preferences;
  }

  public set preferences(value: PreferencesDto) {
    this._preferences = value;
    this.listeners.forEach((listener: PreferencesChangeListener) => listener(this._preferences));
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
    return this.ipcProxy.getData<SettingsDto>(IpcPaths.SETTINGS)
      .then(
        (settings: SettingsDto) => {
          this._preferences = settings.preferences;
          return settings;
        }
      );
  }

  public getSystemSettingsFactoryDefaults(): Promise<SystemSettingsDto> {
    return this.ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS_FACTORY_DEFAULT);
  }

  public restart(): void {
    void this.ipcProxy.postEmptyBody<never>(IpcPaths.RESTART);
  }

  public saveSystemSettings(configuration: SystemSettingsDto): Promise<SystemSettingsDto> {
    return this.ipcProxy
      .postData<SystemSettingsDto, SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS, configuration)
      .then(
        (saved: SystemSettingsDto) => {
          return saved;
        },
        () => configuration
      );
  }

  public savePreferences(arcaneArchiveProxy: IArcaneArchiveProxyService, preferences: PreferencesDto, loggedIn: boolean): Promise<PreferencesDto> {
    const promises = new Array<Promise<PreferencesDto>>();
    promises.push(this.ipcProxy.postData<PreferencesDto, PreferencesDto>(IpcPaths.PREFERENCES, preferences));
    if (loggedIn) {
      promises.push(arcaneArchiveProxy.putData<PreferencesDto, PreferencesDto>(
        "authentication", "/app/account/preferences", preferences
      ));
    }
    return Promise.all(promises)
      .then(
        (saved: Array<PreferencesDto>) => {
          this.preferences = saved[0];
          return saved[0];
        },
        () => preferences
      );
  }

  public subscribePreferenceChangeListener(listener: PreferencesChangeListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((listener: PreferencesChangeListener) => listener !== listener);
    };
  }
  // #endregion
}
