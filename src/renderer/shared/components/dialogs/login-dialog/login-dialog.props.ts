import { LoginRequestDto } from "../../../../../common/dto";
import { LoginViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type LoginDialogProps = BaseDialogPropsNew<LoginRequestDto, LoginViewmodel>;
export type LoginDialogBodyProps = BaseDialogBodyPropsNew<LoginRequestDto, LoginViewmodel>;
export type LoginDialogFooterProps = BaseDialogFooterPropsNew<LoginRequestDto, LoginViewmodel>;
