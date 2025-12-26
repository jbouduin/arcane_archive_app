import { ApiConfigurationDto, PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { PreferencesChangeListener } from "../providers";
import { IIpcProxyService } from "./ipc-proxy.service";
import { IServiceContainer } from "./service-container";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto | null;
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
  savePreferences(serviceContainer: IServiceContainer, preferences: PreferencesDto): Promise<PreferencesDto>;
  subscribe(listener: PreferencesChangeListener): () => void;
}
