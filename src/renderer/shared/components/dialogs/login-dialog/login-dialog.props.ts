import { LoginRequestDto } from "../../../../../common/dto";
import { LoginViewmodel, LoginViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type LoginDialogProps = BaseDialogProps<LoginRequestDto, LoginViewmodelField, LoginViewmodel>;
export type LoginDialogBodyProps = BaseDialogBodyProps<LoginRequestDto, LoginViewmodelField, LoginViewmodel>;
export type LoginDialogFooterProps = BaseDialogFooterProps<LoginRequestDto, LoginViewmodelField, LoginViewmodel>;
