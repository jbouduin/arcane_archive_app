import { SystemInfoDto } from "../../../dto";
import { SystemInfoViewmodel } from "../../../viewmodel/settings/system-info.viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type SystemInfoDialogProps = BaseDialogProps<SystemInfoDto, string, SystemInfoViewmodel>;
export type SystemInfoDialogBodyProps = BaseDialogBodyProps<SystemInfoDto, string, SystemInfoViewmodel>;
export type SystemInfoDialogFooterProps = BaseDialogFooterProps<SystemInfoDto, string, SystemInfoViewmodel>;
