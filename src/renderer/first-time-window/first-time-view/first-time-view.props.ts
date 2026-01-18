import { Props } from "@blueprintjs/core";
import { PreferencesDto, SystemConfigurationDto } from "../../../common/dto";
import { LoginViewmodel, RegisterViewmodel } from "../../shared/viewmodel";

export interface FirstTimeViewProps extends Props {
  systemSettings: SystemConfigurationDto;
  preferences: PreferencesDto;
  loginViewmodel: LoginViewmodel;
  registerViewmodel: RegisterViewmodel;
}
