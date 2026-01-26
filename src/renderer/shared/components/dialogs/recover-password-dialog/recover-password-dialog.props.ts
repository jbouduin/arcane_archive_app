import { RecoverPasswordRequestDto } from "../../../dto";
import { RecoverPasswordViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type RecoverPasswordDialogProps = BaseDialogProps<RecoverPasswordRequestDto, RecoverPasswordViewmodel>;
export type RecoverPasswordDialogBodyProps = BaseDialogBodyProps<RecoverPasswordRequestDto, RecoverPasswordViewmodel>;
export type RecoverPasswordDialogFooterProps = DefaultDialogFooterProps<
  RecoverPasswordRequestDto,
  RecoverPasswordViewmodel
>;
