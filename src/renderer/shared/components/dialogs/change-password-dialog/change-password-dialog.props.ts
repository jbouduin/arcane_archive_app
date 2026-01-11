import { ChangePasswordRequestDto } from "../../../dto";
import { ChangePasswordViewmodel, ChangePasswordViewmodelField } from "../../../viewmodel/authentication/change-password.viewmodel";
import { PasswordViewmodelField } from "../../../viewmodel/authentication/password-viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ChangePasswordDialogProps = BaseDialogProps<
  ChangePasswordRequestDto, ChangePasswordViewmodelField | PasswordViewmodelField, ChangePasswordViewmodel
>;
export type ChangePasswordDialogBodyProps = BaseDialogBodyProps<
  ChangePasswordRequestDto, ChangePasswordViewmodelField | PasswordViewmodelField, ChangePasswordViewmodel
>;
export type ChangePasswordDialogFooterProps = BaseDialogFooterProps<
  ChangePasswordRequestDto, ChangePasswordViewmodelField | PasswordViewmodelField, ChangePasswordViewmodel
>;
