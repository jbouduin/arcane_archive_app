import { LoginRequestDto, LoginResponseDto } from "../../../../common/dto";
import { LoginViewmodel, LoginViewmodelField } from "../../../shared/viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export interface LoginPanelProps extends FirstTimeViewPanelProps<LoginRequestDto, LoginViewmodelField, LoginViewmodel> {
  afterLogin: (response: LoginResponseDto) => void;
}
