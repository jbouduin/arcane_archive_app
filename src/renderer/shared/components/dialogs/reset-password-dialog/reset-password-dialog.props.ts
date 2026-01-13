import { ResetPasswordRequestDto } from "../../../dto";
import { PasswordViewmodelField, ResetPasswordViewmodel, ResetPasswordViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ResetPasswordDialogProps = BaseDialogProps<
  ResetPasswordRequestDto, ResetPasswordViewmodelField | PasswordViewmodelField, ResetPasswordViewmodel
>;
export type ResetPasswordDialogBodyProps = BaseDialogBodyProps<
  ResetPasswordRequestDto, ResetPasswordViewmodelField | PasswordViewmodelField, ResetPasswordViewmodel
>;
export type ResetPasswordDialogFooterProps = BaseDialogFooterProps<
  ResetPasswordRequestDto, ResetPasswordViewmodelField | PasswordViewmodelField, ResetPasswordViewmodel
>;
