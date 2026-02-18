import { SyncRequest, SyncTaskTargetDto } from "../../dto";
import { IArcaneArchiveProxy } from "./arcane-archive.proxy";

export interface ISynchronizeService {
  //#region Synchronization ---------------------------------------------------
  getTaskTargets(): Promise<Array<SyncTaskTargetDto>>;
  synchronize(request: SyncRequest): Promise<void>;
  //#endregion

  //#region Service methods ---------------------------------------------------
  initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void;
  //#endregion
}
