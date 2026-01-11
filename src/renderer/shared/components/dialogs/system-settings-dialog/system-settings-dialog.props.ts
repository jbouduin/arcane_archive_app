import { SystemSettingsDto } from "../../../../../common/dto";
import { SystemSettingsViewmodel, SystemSettingsViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type SystemSettingsDialogProps = BaseDialogProps<SystemSettingsDto, SystemSettingsViewmodelField, SystemSettingsViewmodel>;
export type SystemSettingsDialogBodyProps = BaseDialogBodyProps<SystemSettingsDto, SystemSettingsViewmodelField, SystemSettingsViewmodel>;
export type SystemSettingsDialogFooterProps = BaseDialogFooterProps<SystemSettingsDto, SystemSettingsViewmodelField, SystemSettingsViewmodel>;
