import { BaseViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { BaseFirstTimeViewPanelProps } from "./base-first-time-view-panel.props";

export interface FirstTimeViewPanelProps<T extends object, U extends BaseViewmodel<T>> extends BaseFirstTimeViewPanelProps {
  viewmodel: U;
  viewmodelChanged: (viewmodel: U) => void;
}
