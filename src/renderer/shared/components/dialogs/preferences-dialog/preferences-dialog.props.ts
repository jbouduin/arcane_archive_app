import { PreferencesDto } from "../../../../../common/dto";
import { PreferencesViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type PreferencesDialogProps = BaseDialogProps<PreferencesDto, PreferencesViewmodel>;
export type PreferencesDialogBodyProps = BaseDialogBodyProps<PreferencesDto, PreferencesViewmodel>;
export type PreferencesDialogFooterProps = BaseDialogFooterProps<PreferencesDto, PreferencesViewmodel>;
