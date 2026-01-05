import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type RegisterDialogProps = BaseDialogProps<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogBodyProps = BaseDialogBodyProps<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogFooterProps = BaseDialogFooterProps<RegisterRequestDto, RegisterViewmodel>;
