import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { BaseFirstTimeViewPanelProps } from "./base-first-time-view-panel.props";

export interface FirstTimeViewPanelProps<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>
  extends BaseFirstTimeViewPanelProps {
  viewmodel: Vm;
}
