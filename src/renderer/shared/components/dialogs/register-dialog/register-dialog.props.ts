import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel, RegisterViewmodelField } from "../../../viewmodel";
import { PasswordViewmodelField } from "../../../viewmodel/authentication/password-viewmodel";
import { RegisterViewmodelNew } from "../../../viewmodel/authentication/register.viewmodel-new";
import { BaseDialogBodyProps, BaseDialogBodyPropsNew, BaseDialogFooterProps, BaseDialogFooterPropsNew, BaseDialogProps, BaseDialogPropsNew } from "../../base/base-dialog";

export type RegisterDialogProps = BaseDialogProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
export type RegisterDialogBodyProps = BaseDialogBodyProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;
export type RegisterDialogFooterProps = BaseDialogFooterProps<RegisterRequestDto, RegisterViewmodelField | PasswordViewmodelField, RegisterViewmodel>;

export type RegisterDialogPropsNew = BaseDialogPropsNew<RegisterRequestDto, RegisterViewmodelNew>;
export type RegisterDialogBodyPropsNew = BaseDialogBodyPropsNew<RegisterRequestDto, RegisterViewmodelNew>;
export type RegisterDialogFooterPropsNew = BaseDialogFooterPropsNew<RegisterRequestDto, RegisterViewmodelNew>;
