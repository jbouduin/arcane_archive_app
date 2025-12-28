import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { DiscoveryDto } from "../../../dto";
import { IResult } from "../../base";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto | null;
  readonly isFirstUsage: boolean;
  readonly configuration: SystemSettingsDto;
  readonly preferences: PreferencesDto;

  getSystemSettings(): Promise<IResult<SystemSettingsDto>>;
  getSystemSettingsFactoryDefault(): Promise<IResult<SystemSettingsDto>>;
  getSettings(): Promise<IResult<SettingsDto>>;
  /**
   * Initialize the service. Loads the settings and preferences file. Creating defaults when first use.
   *
   * @param useDarkTheme      used when creating the default preferences
   */
  initialize(useDarkTheme: boolean): void;
  runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void>;
  saveSystemSettings(settings: SystemSettingsDto): Promise<IResult<SystemSettingsDto>>;
  savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>>;
}
