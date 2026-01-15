import { PreferencesDto } from "../../../../common/dto";
import { PreferencesViewmodel, PreferencesViewmodelField } from "../../../shared/viewmodel/settings";
import { FirstTimeViewPanelProps } from "./first-time-view-panel.props";

export interface PreferencePanelProps extends FirstTimeViewPanelProps<PreferencesDto, PreferencesViewmodelField, PreferencesViewmodel, never> {
  onGo: () => void;
}
