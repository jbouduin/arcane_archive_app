import { SyncRequest, SyncTaskDto, SyncTaskTargetDto } from "../../../dto";
import { SynchronizationViewmodel, SynchronizeSetViewmodel } from "../../synchronization";

export interface ISynchronizationViewmodelFactory {
  getSynchronizationViewmodel(dto: SyncRequest, targets: Array<SyncTaskTargetDto>): SynchronizationViewmodel;
  getSynchronizeSetViewmodel(task: SyncTaskDto): SynchronizeSetViewmodel;
}
