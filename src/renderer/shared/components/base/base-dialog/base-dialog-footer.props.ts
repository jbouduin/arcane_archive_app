import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogProps } from "./base-dialog.props";

export interface BaseDialogFooterProps<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>
  extends Omit<BaseDialogProps<Dto, Fn, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: () => void;
}
