import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";

export interface BaseDialogProps<Dto extends object, Vm extends BaseViewmodel<Dto>> extends DialogProps {
  viewmodel: Vm;
  bodyRenderer: (props: BaseDialogBodyProps<Dto, Vm>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<Dto, Vm>) => React.JSX.Element;
}
