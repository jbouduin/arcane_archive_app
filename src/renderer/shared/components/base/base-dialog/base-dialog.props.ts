import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";

export interface BaseDialogProps<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>> extends DialogProps {
  viewmodel: Vm;
  bodyRenderer: (props: BaseDialogBodyProps<Dto, Fn, Vm>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<Dto, Fn, Vm>) => React.JSX.Element;
}
