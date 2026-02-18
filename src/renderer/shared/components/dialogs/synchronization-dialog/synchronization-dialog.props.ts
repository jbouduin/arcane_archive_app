import { SyncRequest } from "../../../dto";
import { SynchronizationViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogProps, DefaultDialogFooterProps } from "../../base/base-dialog";

export type SynchronizationDialogProps = BaseDialogProps<SyncRequest, SynchronizationViewmodel>;
export type SynchronizationDialogBodyProps = BaseDialogBodyProps<SyncRequest, SynchronizationViewmodel>;
export type SynchronizationDialogFooterProps = DefaultDialogFooterProps<SyncRequest, SynchronizationViewmodel>;
