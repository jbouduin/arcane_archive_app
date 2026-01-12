import { PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { PreferencesChangeListener } from "../types";
import { IArcaneArchiveProxyService } from "./arcane-archive-proxy.service";
import { IIpcProxyService } from "./ipc-proxy.service";

export interface IConfigurationService {
  preferences: PreferencesDto;

  /**
   * Initialize the configuration service, storing the ipcProxy and retrieving the system settings.
   *
   * @param ipcProxy the IpcProxyService
   * @returns A Promise, when fullfilled the retrieved SystemSettingsDto.
   */
  initialize(ipcProx: IIpcProxyService): Promise<SettingsDto>;
  saveSystemSettings(configuration: SystemSettingsDto): Promise<SystemSettingsDto>;
  getSystemSettingsFactoryDefaults(): Promise<SystemSettingsDto>;
  restart(): void;
  savePreferences(arcaneArchiveProxy: IArcaneArchiveProxyService, preferences: PreferencesDto, loggedIn: boolean): Promise<PreferencesDto>;
  subscribePreferenceChangeListener(listener: PreferencesChangeListener): () => void;
}
