import { SettingsDto } from "../../../../common/dto";
import { IResult } from "../../base";

export interface IConfigurationService {
  readonly dataBaseFilePath: string;
  readonly isFirstUsage: boolean;
  readonly configuration: SettingsDto;

  getFactoryDefault(): Promise<IResult<SettingsDto>>;
  getSettings(): Promise<IResult<SettingsDto>>;
  loadSettings(appDirectory: string, homeDirectory: string, useDarkTheme: boolean): void;
  putSettings(settings: SettingsDto): Promise<IResult<SettingsDto>>;
  setSettings(settings: SettingsDto): Promise<IResult<SettingsDto>>;
}
