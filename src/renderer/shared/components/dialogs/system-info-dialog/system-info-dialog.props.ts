import { SystemInfoDto } from "../../../dto";
import { SystemInfoViewmodel } from "../../../viewmodel/settings/system-info.viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type SystemInfoDialogProps = BaseDialogProps<SystemInfoDto, SystemInfoViewmodel>;
export type SystemInfoDialogBodyProps = BaseDialogBodyProps<SystemInfoDto, SystemInfoViewmodel>;
export type SystemInfoDialogFooterProps = DefaultDialogFooterProps<SystemInfoDto, SystemInfoViewmodel>;
