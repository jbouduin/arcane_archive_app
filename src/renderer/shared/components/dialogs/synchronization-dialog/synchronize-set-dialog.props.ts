import { SyncRequest } from "../../../dto";
import { SynchronizeSetViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogProps, DefaultDialogFooterProps } from "../../base/base-dialog";

export type SynchronizeSetDialogProps = BaseDialogProps<SyncRequest, SynchronizeSetViewmodel>;
export type SynchronizeSetDialogBodyProps = BaseDialogBodyProps<SyncRequest, SynchronizeSetViewmodel>;
export type SynchronizeSetDialogFooterProps = DefaultDialogFooterProps<SyncRequest, SynchronizeSetViewmodel>;
