import { PreferencesDto } from "../../../../../common/dto";
import { PreferencesViewmodel, PreferencesViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type PreferencesDialogProps = BaseDialogProps<PreferencesDto, PreferencesViewmodelField, PreferencesViewmodel>;
export type PreferencesDialogBodyProps = BaseDialogBodyProps<PreferencesDto, PreferencesViewmodelField, PreferencesViewmodel>;
export type PreferencesDialogFooterProps = BaseDialogFooterProps<PreferencesDto, PreferencesViewmodelField, PreferencesViewmodel>;
