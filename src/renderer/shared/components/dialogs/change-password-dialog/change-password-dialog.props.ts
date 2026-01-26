import { ChangePasswordRequestDto } from "../../../dto";
import { ChangePasswordViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ChangePasswordDialogProps = BaseDialogProps<ChangePasswordRequestDto, ChangePasswordViewmodel>;
export type ChangePasswordDialogBodyProps = BaseDialogBodyProps<ChangePasswordRequestDto, ChangePasswordViewmodel>;
export type ChangePasswordDialogFooterProps = DefaultDialogFooterProps<
  ChangePasswordRequestDto,
  ChangePasswordViewmodel
>;
