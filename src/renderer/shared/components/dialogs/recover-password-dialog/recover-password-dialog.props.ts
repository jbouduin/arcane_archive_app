import { RecoverPasswordRequestDto } from "../../../dto";
import { RecoverPasswordViewmodelField, PasswordViewmodelField, RecoverPasswordViewmodel } from "../../../viewmodel";
import { BaseDialogProps, BaseDialogBodyProps, BaseDialogFooterProps } from "../../base/base-dialog";

export type RecoverPasswordDialogProps = BaseDialogProps<
  RecoverPasswordRequestDto, RecoverPasswordViewmodelField | PasswordViewmodelField, RecoverPasswordViewmodel
>;
export type RecoverPasswordDialogBodyProps = BaseDialogBodyProps<
  RecoverPasswordRequestDto, RecoverPasswordViewmodelField | PasswordViewmodelField, RecoverPasswordViewmodel
>;
export type RecoverPasswordDialogFooterProps = BaseDialogFooterProps<
  RecoverPasswordRequestDto, RecoverPasswordViewmodelField | PasswordViewmodelField, RecoverPasswordViewmodel
>;
