import { LoginRequestDto } from "../../../../../common/dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type LoginDialogProps = BaseDialogProps<LoginRequestDto, LoginViewmodel>;
export type LoginDialogBodyProps = BaseDialogBodyProps<LoginRequestDto, LoginViewmodel>;
export type LoginDialogFooterProps = DefaultDialogFooterProps<LoginRequestDto, LoginViewmodel>;
