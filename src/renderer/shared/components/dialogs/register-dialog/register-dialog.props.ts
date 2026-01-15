import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type RegisterDialogProps = BaseDialogPropsNew<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogBodyProps = BaseDialogBodyPropsNew<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogFooterProp = BaseDialogFooterPropsNew<RegisterRequestDto, RegisterViewmodel>;
