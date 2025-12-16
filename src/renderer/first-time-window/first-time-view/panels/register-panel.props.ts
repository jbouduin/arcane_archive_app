import { RegisterRequestDto } from "../../../shared/dto";
import { RegisterViewmodel } from "../../../shared/viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export type RegisterPanelProps = FirstTimeViewPanelProps<RegisterRequestDto, RegisterViewmodel>;
