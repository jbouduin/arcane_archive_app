import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps, BaseDialogBodyProps2 } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";

// TODO use V2 of props
export interface BaseDialogProps2<T extends object, U extends BaseViewmodel<T>> {
  viewmodel: U;
  bodyRenderer: (props: BaseDialogBodyProps2<T, U>) => React.JSX.Element;
}

export interface BaseDialogProps<T extends object> extends DialogProps {
  viewmodel: BaseViewmodel<T>;
  bodyRenderer: (props: BaseDialogBodyProps<T>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<T>) => React.JSX.Element;
}
