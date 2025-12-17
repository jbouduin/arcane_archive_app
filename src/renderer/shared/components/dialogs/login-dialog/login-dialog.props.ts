import { LoginRequestDto } from "../../../dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type LoginDialogProps = BaseDialogProps<LoginRequestDto, LoginViewmodel>;
export type LoginDialogBodyProps = BaseDialogBodyProps<LoginRequestDto, LoginViewmodel>;
export type LoginDialogFooterProps = BaseDialogFooterProps<LoginRequestDto, LoginViewmodel>;
