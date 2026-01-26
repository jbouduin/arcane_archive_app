import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type RegisterDialogProps = BaseDialogProps<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogBodyProps = BaseDialogBodyProps<RegisterRequestDto, RegisterViewmodel>;
export type RegisterDialogFooterProp = DefaultDialogFooterProps<RegisterRequestDto, RegisterViewmodel>;
