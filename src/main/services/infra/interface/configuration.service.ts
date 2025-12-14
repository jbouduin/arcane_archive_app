import { ApiConfigurationDto, PreferencesDto, ResultDto, SettingsDto, SystemSettingsDto } from "../../../../common/dto";
import { DiscoveryDto } from "../../../dto";
import { IResult } from "../../base";

export interface IConfigurationService {
  readonly apiConfiguration: ApiConfigurationDto;
  readonly dataBaseFilePath: string;
  readonly isFirstUsage: boolean;
  readonly configuration: SystemSettingsDto;
  readonly preferences: PreferencesDto;

  getSystemSettings(): Promise<IResult<SystemSettingsDto>>;
  getSystemSettingsFactoryDefault(): Promise<IResult<SystemSettingsDto>>;
  getSettings(): Promise<IResult<SettingsDto>>;
  initialize(appDirectory: string, homeDirectory: string, useDarkTheme: boolean): void;
  runDiscovery(discover: () => Promise<ResultDto<DiscoveryDto>>): Promise<void>;
  saveSystemSettings(settings: SystemSettingsDto): Promise<IResult<SystemSettingsDto>>;
  savePreferences(preferences: PreferencesDto): Promise<IResult<PreferencesDto>>;
}
