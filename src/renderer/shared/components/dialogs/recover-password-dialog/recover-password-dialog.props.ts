import { RecoverPasswordRequestDto } from "../../../dto";
import { RecoverPasswordViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type RecoverPasswordDialogProps = BaseDialogPropsNew<RecoverPasswordRequestDto, RecoverPasswordViewmodel>;
export type RecoverPasswordDialogBodyProps = BaseDialogBodyPropsNew<RecoverPasswordRequestDto, RecoverPasswordViewmodel>;
export type RecoverPasswordDialogFooterProps = BaseDialogFooterPropsNew<RecoverPasswordRequestDto, RecoverPasswordViewmodel>;
