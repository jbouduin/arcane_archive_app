import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemConfigurationDto } from "../../../../common/dto";
import { DiscoveryDto } from "../../../dto";
import { IResult } from "../../base";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto | null;
  readonly isFirstUsage: boolean;
  readonly systemConfiguration: SystemConfigurationDto;
  readonly preferences: PreferencesDto;
  readonly cacheDatabaseFilePath: string;

  getSystemSettings(): Promise<IResult<SystemConfigurationDto>>;
  getSystemSettingsFactoryDefault(): Promise<IResult<SystemConfigurationDto>>;
  getSettings(): Promise<IResult<SettingsDto>>;
  /**
   * Initialize the service. Loads the settings and preferences file. Creating defaults when first use.
   *
   * @param useDarkTheme      used when creating the default preferences
   */
  initialize(useDarkTheme: boolean): void;
  runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void>;
  saveSystemSettings(settings: SystemConfigurationDto): Promise<IResult<SystemConfigurationDto>>;
  savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>>;
}
