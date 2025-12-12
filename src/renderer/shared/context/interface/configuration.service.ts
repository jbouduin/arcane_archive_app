import { PreferencesDto, SettingsDto } from "../../../../common/dto";
import { PreferencesChangeListener } from "../providers";
import { IIpcProxyService } from "./ipc-proxy.service";

export interface IConfigurationService {
  readonly configuration: SettingsDto;
  readonly preferences: PreferencesDto;

  initialize(ipcProx: IIpcProxyService): Promise<SettingsDto>;
  saveConfiguration(configuration: SettingsDto): Promise<SettingsDto>;
  updateLocalPreferences(preferences: PreferencesDto): Promise<PreferencesDto>;
  subscribe(listener: PreferencesChangeListener): () => void;
}
