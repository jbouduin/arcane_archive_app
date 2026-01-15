import { PreferencesDto } from "../../../../../common/dto";
import { PreferencesViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type PreferencesDialogProps = BaseDialogPropsNew<PreferencesDto, PreferencesViewmodel>;
export type PreferencesDialogBodyProps = BaseDialogBodyPropsNew<PreferencesDto, PreferencesViewmodel>;
export type PreferencesDialogFooterProps = BaseDialogFooterPropsNew<PreferencesDto, PreferencesViewmodel>;
