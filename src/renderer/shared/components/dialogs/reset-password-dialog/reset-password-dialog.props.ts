import { ResetPasswordRequestDto } from "../../../dto";
import { ResetPasswordViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type ResetPasswordDialogProps = BaseDialogPropsNew<ResetPasswordRequestDto, ResetPasswordViewmodel>;
export type ResetPasswordDialogBodyProps = BaseDialogBodyPropsNew<ResetPasswordRequestDto, ResetPasswordViewmodel>;
export type ResetPasswordDialogFooterProps = BaseDialogFooterPropsNew<ResetPasswordRequestDto, ResetPasswordViewmodel>;
