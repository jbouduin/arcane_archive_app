import { LoginResponseDto } from "../../../../common/dto";
import { LoginRequestDto } from "../../../shared/dto";
import { LoginViewmodel } from "../../../shared/viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export interface LoginPanelProps extends FirstTimeViewPanelProps<LoginRequestDto, LoginViewmodel> {
  afterLogin: (response: LoginResponseDto) => void;
}
