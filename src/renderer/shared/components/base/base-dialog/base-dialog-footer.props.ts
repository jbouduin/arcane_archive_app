import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseViewmodelNew } from "../../../viewmodel/base.viewmodel-new";
import { BaseDialogProps, BaseDialogPropsNew } from "./base-dialog.props";

export interface BaseDialogFooterProps<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>
  extends Omit<BaseDialogProps<Dto, Fn, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: () => void;
}

export interface BaseDialogFooterPropsNew<Dto extends object, Vm extends BaseViewmodelNew<Dto>>
  extends Omit<BaseDialogPropsNew<Dto, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: () => void;
}
