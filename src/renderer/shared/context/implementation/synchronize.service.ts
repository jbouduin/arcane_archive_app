import { SyncRequest, SyncTaskTargetDto } from "../../dto";
import { IArcaneArchiveProxy, ISynchronizeService } from "../interface";

export class SynchronizeService implements ISynchronizeService {
  //#region Private fields ----------------------------------------------------
  private arcaneArchiveProxy!: IArcaneArchiveProxy;
  private syncTaskTargets: Array<SyncTaskTargetDto> | null;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor() {
    this.syncTaskTargets = null;
  }
  //#endregion

  //#region ISynchronizeService Members: synhcronization ----------------------
  public async getTaskTargets(): Promise<Array<SyncTaskTargetDto>> {
    if (this.syncTaskTargets == null) {
      this.syncTaskTargets = await this.arcaneArchiveProxy
        .getData<Array<SyncTaskTargetDto>>("library", "/admin/synchronization/task-target");
    }
    return this.syncTaskTargets;
  }

  public async synchronize(request: SyncRequest): Promise<void> {
    void this.arcaneArchiveProxy
      .postData<SyncRequest, never>(
        "library",
        "/admin/synchronization/request/partial",
        request,
        { suppressSuccessMessage: false }
      );
  }
  //#endregion

  //#region ISynchronizeService Members: service ------------------------------
  public initialize(arcaneArchiveProxy: IArcaneArchiveProxy): void {
    this.arcaneArchiveProxy = arcaneArchiveProxy;
  }
  //#endregion
}
