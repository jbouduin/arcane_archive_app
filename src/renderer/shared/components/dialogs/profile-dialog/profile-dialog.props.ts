import { UserDto } from "../../../dto";
import { UserViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ProfileDialogProps = BaseDialogProps<UserDto, UserViewmodel>;
export type ProfileDialogBodyProps = BaseDialogBodyProps<UserDto, UserViewmodel>;
export type ProfileDialogFooterProps = BaseDialogFooterProps<UserDto, UserViewmodel>;
