import { ChangePasswordRequestDto } from "../../../dto";
import { ChangePasswordViewmodel } from "../../../viewmodel/authentication/change-password.viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type ChangePasswordDialogProps = BaseDialogPropsNew<ChangePasswordRequestDto, ChangePasswordViewmodel>;
export type ChangePasswordDialogBodyProps = BaseDialogBodyPropsNew<ChangePasswordRequestDto, ChangePasswordViewmodel>;
export type ChangePasswordDialogFooterProps = BaseDialogFooterPropsNew<ChangePasswordRequestDto, ChangePasswordViewmodel>;
