import { BaseViewmodel } from "../../../shared/viewmodel";
import { BaseFirstTimeViewPanelProps } from "./base-first-time-view-panel.props";

export interface FirstTimeViewPanelProps<Dto extends object, Vm extends BaseViewmodel<Dto>>
  extends BaseFirstTimeViewPanelProps {
  viewmodel: Vm;
}
