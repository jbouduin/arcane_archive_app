import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel, RegisterViewmodelField } from "../../../viewmodel";
import { PasswordViewmodelField } from "../../../viewmodel/authentication/password-viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type RegisterDialogProps = BaseDialogProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
export type RegisterDialogBodyProps = BaseDialogBodyProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
export type RegisterDialogFooterProps = BaseDialogFooterProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
