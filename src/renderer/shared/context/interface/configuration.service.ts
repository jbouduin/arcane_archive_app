import { ApiConfigurationDto, PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { PreferencesChangeListener } from "../providers";
import { IIpcProxyService } from "./ipc-proxy.service";
import { IServiceContainer } from "./service-container";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto;
  preferences: PreferencesDto;

  initialize(ipcProx: IIpcProxyService): Promise<SettingsDto>;
  saveSystemSettings(configuration: SystemSettingsDto): Promise<SystemSettingsDto>;
  savePreferences(serviceContainer: IServiceContainer, preferences: PreferencesDto): Promise<PreferencesDto>;
  subscribe(listener: PreferencesChangeListener): () => void;
}
