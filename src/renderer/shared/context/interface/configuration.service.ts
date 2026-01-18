import { PreferencesDto, SettingsDto, SystemConfigurationDto } from "../../../../common/dto";
import { PreferencesChangeListener, SystemConfigurationChangeListener } from "../types";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";
import { IIpcProxy } from "./ipc-proxy";

export interface IConfigurationService {
  /**
   * Initialize the configuration service, storing the ipcProxy and retrieving the system settings.
   *
   * @param ipcProxy the IpcProxyService
   * @returns A Promise, when fullfilled the retrieved SystemSettingsDto.
   */
  initialize(ipcProx: IIpcProxy): Promise<SettingsDto>;
  saveSystemSettings(configuration: SystemConfigurationDto): Promise<SystemConfigurationDto>;
  getSystemSettingsFactoryDefaults(): Promise<SystemConfigurationDto>;
  restart(): void;
  savePreferences(
    arcaneArchiveProxy: IArcaneArchiveProxy,
    preferences: PreferencesDto,
    loggedIn: boolean
  ): Promise<PreferencesDto>;
  subscribePreferenceChangeListener(listener: PreferencesChangeListener): () => void;
  subscribeSystemConfigurationChangeListener(listener: SystemConfigurationChangeListener): () => void;
}
