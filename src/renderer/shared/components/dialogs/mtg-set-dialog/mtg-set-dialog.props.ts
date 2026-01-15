import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { BaseDialogBodyPropsNew, BaseDialogFooterPropsNew, BaseDialogPropsNew } from "../../base/base-dialog";

export type MtgSetDialogProps = BaseDialogPropsNew<MtgSetDto, MtgSetDetailViewmodel>;
export type MtgSetDialogBodyProps = BaseDialogBodyPropsNew<MtgSetDto, MtgSetDetailViewmodel>;
export type MtgSetDialogFooterProps = BaseDialogFooterPropsNew<MtgSetDto, MtgSetDetailViewmodel>;
