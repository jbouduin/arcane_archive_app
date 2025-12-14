import { ApiConfigurationDto, PreferencesDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { PreferencesChangeListener } from "../providers";
import { IIpcProxyService } from "./ipc-proxy.service";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto;
  readonly preferences: PreferencesDto;

  initialize(ipcProx: IIpcProxyService): Promise<SettingsDto>;
  saveConfiguration(configuration: SystemSettingsDto): Promise<SystemSettingsDto>;
  updateLocalPreferences(preferences: PreferencesDto): Promise<PreferencesDto>;
  subscribe(listener: PreferencesChangeListener): () => void;
}
