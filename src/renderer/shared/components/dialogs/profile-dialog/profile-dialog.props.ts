import { ProfileDto } from "../../../dto";
import { ProfileViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type ProfileDialogProps = BaseDialogPropsNew<ProfileDto, ProfileViewmodel>;
export type ProfileDialogBodyProps = BaseDialogBodyPropsNew<ProfileDto, ProfileViewmodel>;
export type ProfileDialogFooterProps = BaseDialogFooterPropsNew<ProfileDto, ProfileViewmodel>;
