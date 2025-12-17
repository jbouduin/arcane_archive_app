import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type MtgSetDialogProps = BaseDialogProps<MtgSetDto, MtgSetDetailViewmodel>;
export type MtgSetDialogBodyProps = BaseDialogBodyProps<MtgSetDto, MtgSetDetailViewmodel>;
export type MtgSetDialogFooterProps = BaseDialogFooterProps<MtgSetDto, MtgSetDetailViewmodel>;
