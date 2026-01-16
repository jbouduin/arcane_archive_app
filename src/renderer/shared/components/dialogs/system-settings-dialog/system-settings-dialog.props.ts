import { SystemSettingsDto } from "../../../../../common/dto";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type SystemSettingsDialogProps = BaseDialogPropsNew<SystemSettingsDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogBodyProps = BaseDialogBodyPropsNew<SystemSettingsDto, SystemSettingsViewmodel>;
export type SystemSettingsDialogFooterProps = BaseDialogFooterPropsNew<SystemSettingsDto, SystemSettingsViewmodel>;
