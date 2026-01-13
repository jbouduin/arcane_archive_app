import { Props } from "@blueprintjs/core";
import { SystemSettingsDto } from "../../../common/dto";
import { LoginViewmodel, RegisterViewmodel } from "../../shared/viewmodel";

export interface FirstTimeViewProps extends Props {
  systemSettings: SystemSettingsDto;
  loginViewmodel: LoginViewmodel;
  registerViewmodel: RegisterViewmodel;
}
