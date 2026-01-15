import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseViewmodelNew } from "../../../viewmodel/base.viewmodel-new";
import { BaseDialogBodyProps, BaseDialogBodyPropsNew } from "./base-dialog-body.props";
import { BaseDialogFooterProps, BaseDialogFooterPropsNew } from "./base-dialog-footer.props";

export interface BaseDialogProps<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>> extends DialogProps {
  viewmodel: Vm;
  bodyRenderer: (props: BaseDialogBodyProps<Dto, Fn, Vm>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<Dto, Fn, Vm>) => React.JSX.Element;
}

// TODO remove Vm extends BaseViewmodelNew<Dto>
export interface BaseDialogPropsNew<Dto extends object, Vm extends BaseViewmodelNew<Dto>> extends DialogProps {
  viewmodel: Vm;
  bodyRenderer: (props: BaseDialogBodyPropsNew<Dto, Vm>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterPropsNew<Dto, Vm>) => React.JSX.Element;
}
