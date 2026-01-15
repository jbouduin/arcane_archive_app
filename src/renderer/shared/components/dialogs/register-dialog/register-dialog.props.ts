import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type RegisterDialogPropsNew = BaseDialogPropsNew<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogBodyPropsNew = BaseDialogBodyPropsNew<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogFooterPropsNew = BaseDialogFooterPropsNew<RegisterRequestDto, RegisterViewmodel>;
