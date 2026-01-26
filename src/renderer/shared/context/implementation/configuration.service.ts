import { PreferencesDto, SettingsDto, SystemConfigurationDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { mergeWithChangeDetails } from "../../../../common/util";
import { IArcaneArchiveProxy, IConfigurationService, IIpcProxy, ISessionService } from "../interface";
import { PreferencesChangeListener, SystemConfigurationChangeListener } from "../types";

export class ConfigurationService implements IConfigurationService {
  // #region private fields ---------------------------------------------------
  private ipcProxy!: IIpcProxy;
  private _preferences!: PreferencesDto;
  private _systemConfiguration!: SystemConfigurationDto;
  private preferenceChangelisteners: Array<PreferencesChangeListener>;
  private systemConfigurationChangelisteners: Array<SystemConfigurationChangeListener>;
  private unsubscribePreferencesLoaded: (() => void) | null;
  // #endregion

  // #region Private Setters --------------------------------------------------
  private set preferences(value: PreferencesDto) {
    this._preferences = value;
    this.preferenceChangelisteners.forEach((listener: PreferencesChangeListener) => listener(this._preferences));
  }

  private set systemConfiguration(value: SystemConfigurationDto) {
    this._systemConfiguration = value;
    this.systemConfigurationChangelisteners.forEach(
      (listener: SystemConfigurationChangeListener) => listener(this._systemConfiguration)
    );
  }
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this.preferenceChangelisteners = new Array<PreferencesChangeListener>();
    this.systemConfigurationChangelisteners = new Array<SystemConfigurationChangeListener>();
    this.unsubscribePreferencesLoaded = null;
  }
  // #endregion

  // #region IConfiguration Members -------------------------------------------
  public initialize(ipcProxy: IIpcProxy): Promise<SettingsDto> {
    this.ipcProxy = ipcProxy;
    return this.ipcProxy.getData<SettingsDto>(IpcPaths.SETTINGS)
      .then(
        (settings: SettingsDto) => {
          this.preferences = settings.preferences;
          this.systemConfiguration = settings.systemConfiguration;
          return settings;
        }
      );
  }

  public initializeSubscriptions(sessionService: ISessionService): void {
    if (this.unsubscribePreferencesLoaded == null) {
      this.unsubscribePreferencesLoaded = sessionService.subscribePreferencesLoadedListener(
        (data: PreferencesDto) => {
          const mergePreferencesResult = mergeWithChangeDetails(this._preferences, data);
          if (mergePreferencesResult.changed) {
            void this.ipcProxy
              .postData<PreferencesDto, PreferencesDto>(IpcPaths.PREFERENCES, mergePreferencesResult.merged);
          }
          this.preferences = data;
        }
      );
    }
  }

  public getSystemSettingsFactoryDefaults(): Promise<SystemConfigurationDto> {
    return this.ipcProxy.getData<SystemConfigurationDto>(IpcPaths.SYSTEM_SETTINGS_FACTORY_DEFAULT);
  }

  public restart(): void {
    void this.ipcProxy.postEmptyBody<never>(IpcPaths.RESTART);
  }

  public saveSystemSettings(configuration: SystemConfigurationDto): Promise<SystemConfigurationDto> {
    return this.ipcProxy
      .postData<SystemConfigurationDto, SystemConfigurationDto>(IpcPaths.SYSTEM_SETTINGS, configuration)
      .then(
        (saved: SystemConfigurationDto) => {
          this.systemConfiguration = saved;
          return saved;
        },
        () => configuration
      );
  }

  public savePreferences(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    preferences: PreferencesDto,
    loggedIn: boolean
  ): Promise<PreferencesDto> {
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
    this.preferenceChangelisteners.push(listener);
    return () => {
      this.preferenceChangelisteners = this.preferenceChangelisteners
        .filter((listener: PreferencesChangeListener) => listener !== listener);
    };
  }

  public subscribeSystemConfigurationChangeListener(listener: SystemConfigurationChangeListener): () => void {
    this.systemConfigurationChangelisteners.push(listener);
    return () => {
      this.systemConfigurationChangelisteners = this.systemConfigurationChangelisteners
        .filter((listener: SystemConfigurationChangeListener) => listener !== listener);
    };
  }
  // #endregion
}
