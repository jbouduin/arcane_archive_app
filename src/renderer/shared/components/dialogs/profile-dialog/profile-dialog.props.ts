import { UserDto } from "../../../dto";
import { UserViewmodel, UserViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ProfileDialogProps = BaseDialogProps<UserDto, UserViewmodelField, UserViewmodel>;
export type ProfileDialogBodyProps = BaseDialogBodyProps<UserDto, UserViewmodelField, UserViewmodel>;
export type ProfileDialogFooterProps = BaseDialogFooterProps<UserDto, UserViewmodelField, UserViewmodel>;
