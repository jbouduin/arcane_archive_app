import { PreferencesDto } from "../../../../common/dto";
import { PreferencesViewmodel } from "../../../shared/viewmodel";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export interface PreferencePanelProps extends FirstTimeViewPanelProps<PreferencesDto, PreferencesViewmodel> {
  onGo: () => void;
}
