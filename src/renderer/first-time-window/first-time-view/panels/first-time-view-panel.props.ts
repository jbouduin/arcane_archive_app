import { BaseViewmodel as OldViewmodel } from "../../../shared/viewmodel/base.viewmodel";
import { BaseViewmodelNew } from "../../../shared/viewmodel/base.viewmodel-new";
import { BaseFirstTimeViewPanelProps } from "./base-first-time-view-panel.props";

export interface FirstTimeViewPanelProps<Dto extends object, Fn extends string, Vm extends OldViewmodel<Dto, Fn>, NVm extends BaseViewmodelNew<Dto>>
  extends BaseFirstTimeViewPanelProps {
  viewmodel?: Vm;
  newViewmodel?: NVm;
}
