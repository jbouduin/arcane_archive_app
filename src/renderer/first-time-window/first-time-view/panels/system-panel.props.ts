import { SystemSettingsDto } from "../../../../common/dto";
import { SystemSettingsViewmodel, SystemSettingsViewmodelField } from "../../../shared/viewmodel/settings";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export type SystemPanelProps = FirstTimeViewPanelProps<SystemSettingsDto, SystemSettingsViewmodelField, SystemSettingsViewmodel, never>;
