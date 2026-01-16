import { SystemSettingsDto } from "../../../../../common/dto";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type SystemSettingsDialogProps = BaseDialogProps<SystemSettingsDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogBodyProps = BaseDialogBodyProps<SystemSettingsDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogFooterProps = DefaultDialogFooterProps<SystemSettingsDto, SystemSettingsViewmodel>;
