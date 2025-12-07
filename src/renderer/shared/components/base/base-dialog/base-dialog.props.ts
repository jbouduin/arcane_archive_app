import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";

export interface BaseDialogProps<T extends object> extends DialogProps {
  viewmodel: BaseViewmodel<T>;
  bodyRenderer: (props: BaseDialogBodyProps<T>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<T>) => React.JSX.Element;
}
