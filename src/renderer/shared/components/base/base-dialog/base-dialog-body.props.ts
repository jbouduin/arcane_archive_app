import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogProps } from "./base-dialog.props";

export interface BaseDialogBodyProps<T extends object> extends BaseDialogProps<T> {
  viewModelChanged: (v: BaseViewmodel<T>) => void;
}
