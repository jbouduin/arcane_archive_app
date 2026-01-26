import { SystemConfigurationDto } from "../../../../../common/dto";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, DefaultDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type SystemSettingsDialogProps = BaseDialogProps<SystemConfigurationDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogBodyProps = BaseDialogBodyProps<SystemConfigurationDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogFooterProps = DefaultDialogFooterProps<SystemConfigurationDto, SystemSettingsViewmodel>;
