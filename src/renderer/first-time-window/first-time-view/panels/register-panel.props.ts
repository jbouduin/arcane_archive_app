import { RegisterRequestDto } from "../../../shared/dto";
import { RegisterViewmodel, RegisterViewmodelField } from "../../../shared/viewmodel";
import { PasswordViewmodelField } from "../../../shared/viewmodel/authentication/password-viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export type RegisterPanelProps = FirstTimeViewPanelProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
