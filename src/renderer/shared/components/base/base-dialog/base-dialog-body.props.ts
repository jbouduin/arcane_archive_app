import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogProps } from "./base-dialog.props";

export interface BaseDialogBodyProps<Dto extends object, Vm extends BaseViewmodel<Dto>>
  extends Omit<BaseDialogProps<Dto, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: (v: Vm) => void;
}
