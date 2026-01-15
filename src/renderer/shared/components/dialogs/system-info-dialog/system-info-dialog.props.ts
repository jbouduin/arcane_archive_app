import { SystemInfoDto } from "../../../dto";
import { SystemInfoViewmodel } from "../../../viewmodel/settings/system-info.viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type SystemInfoDialogProps = BaseDialogPropsNew<SystemInfoDto, SystemInfoViewmodel>;
export type SystemInfoDialogBodyProps = BaseDialogBodyPropsNew<SystemInfoDto, SystemInfoViewmodel>;
export type SystemInfoDialogFooterProps = BaseDialogFooterPropsNew<SystemInfoDto, SystemInfoViewmodel>;
