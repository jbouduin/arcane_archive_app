import { SystemSettingsDto } from "../../../../common/dto";
import { SystemSettingsViewmodel } from "../../../shared/viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export type SystemPanelProps = FirstTimeViewPanelProps<SystemSettingsDto, SystemSettingsViewmodel>;
