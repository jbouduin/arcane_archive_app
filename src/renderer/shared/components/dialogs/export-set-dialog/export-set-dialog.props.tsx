import { ExportSetRequest } from "../../../../../common/dto";
import { ExportSetViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogProps, DefaultDialogFooterProps } from "../../base/base-dialog";

export type ExportSetDialogProps = BaseDialogProps<ExportSetRequest, ExportSetViewmodel>;
export type ExportSetDialogBodyProps = BaseDialogBodyProps<ExportSetRequest, ExportSetViewmodel>;
export type ExportSetDialogFooterProps = DefaultDialogFooterProps<ExportSetRequest, ExportSetViewmodel>;
