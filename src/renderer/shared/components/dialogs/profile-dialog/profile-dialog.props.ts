import { ProfileDto } from "../../../dto";
import { ProfileViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type ProfileDialogProps = BaseDialogProps<ProfileDto, ProfileViewmodel>;
export type ProfileDialogBodyProps = BaseDialogBodyProps<ProfileDto, ProfileViewmodel>;
export type ProfileDialogFooterProps = DefaultDialogFooterProps<ProfileDto, ProfileViewmodel>;
