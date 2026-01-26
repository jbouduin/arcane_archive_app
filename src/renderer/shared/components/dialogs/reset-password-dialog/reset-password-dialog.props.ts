import { ResetPasswordRequestDto } from "../../../dto";
import { ResetPasswordViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ResetPasswordDialogProps = BaseDialogProps<ResetPasswordRequestDto, ResetPasswordViewmodel>;
export type ResetPasswordDialogBodyProps = BaseDialogBodyProps<ResetPasswordRequestDto, ResetPasswordViewmodel>;
export type ResetPasswordDialogFooterProps = DefaultDialogFooterProps<ResetPasswordRequestDto, ResetPasswordViewmodel>;
