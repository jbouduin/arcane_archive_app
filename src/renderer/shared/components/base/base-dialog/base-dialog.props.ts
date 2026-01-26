import { DialogProps } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel";

export interface BaseDialogProps<Dto extends object, Vm extends BaseViewmodel<Dto>> extends DialogProps {
  viewmodel: Vm;
  bodyRenderer: (props: BaseDialogBodyProps<Dto, Vm>) => React.JSX.Element;
  footerRenderer: (props: BaseDialogFooterProps<Dto, Vm>) => React.JSX.Element;
}

export interface BaseDialogBodyProps<Dto extends object, Vm extends BaseViewmodel<Dto>>
  extends Omit<BaseDialogProps<Dto, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: () => void;
}

export interface BaseDialogFooterProps<Dto extends object, Vm extends BaseViewmodel<Dto>>
  extends Omit<BaseDialogProps<Dto, Vm>, "bodyRenderer" | "footerRenderer"> {
  viewmodelChanged: () => void;
}
