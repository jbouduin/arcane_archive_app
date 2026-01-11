import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel, MtgSetDetailViewmodelField } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";

export type MtgSetDialogProps = BaseDialogProps<MtgSetDto, MtgSetDetailViewmodelField, MtgSetDetailViewmodel>;
export type MtgSetDialogBodyProps = BaseDialogBodyProps<MtgSetDto, MtgSetDetailViewmodelField, MtgSetDetailViewmodel>;
export type MtgSetDialogFooterProps = BaseDialogFooterProps<MtgSetDto, MtgSetDetailViewmodelField, MtgSetDetailViewmodel>;
