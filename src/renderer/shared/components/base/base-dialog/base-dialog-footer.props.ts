import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogProps, BaseDialogProps2 } from "./base-dialog.props";

// TODO use V2 of props
export interface BaseDialogFooterProps2<T extends object, U extends BaseViewmodel<T>>
  extends Omit<BaseDialogProps2<T, U>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: (v: U) => void;
}

export interface BaseDialogFooterProps<T extends object>
  extends Omit<BaseDialogProps<T>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: (v: BaseViewmodel<T>) => void;
}
