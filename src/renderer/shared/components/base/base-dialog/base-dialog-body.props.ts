import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogProps } from "./base-dialog.props";

export interface BaseDialogBodyProps<T extends object>
  extends Omit<BaseDialogProps<T>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: (v: BaseViewmodel<T>) => void;
}
