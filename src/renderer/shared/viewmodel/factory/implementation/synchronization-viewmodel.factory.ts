import { IBasicDataService } from "../../../context";
import { SyncRequest, SyncTaskDto, SyncTaskTargetDto } from "../../../dto";
import { SynchronizationViewmodel, SynchronizeSetViewmodel } from "../../synchronization";
import { ISynchronizationViewmodelFactory } from "../interface/synchronization-viewmodel.factory";

export class SynchronizationViewmodelFactory implements ISynchronizationViewmodelFactory {
  //#region Private fields ----------------------------------------------------
  private basicDataService: IBasicDataService;
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(basicDataService: IBasicDataService) {
    this.basicDataService = basicDataService;
  }
  //#endregion

  //#region ISynchronizationViewmodelFactory Members ------------------------------------
  public getSynchronizationViewmodel(dto: SyncRequest, targets: Array<SyncTaskTargetDto>): SynchronizationViewmodel {
    return new SynchronizationViewmodel(dto, targets, this.basicDataService);
  }

  public getSynchronizeSetViewmodel(task: SyncTaskDto): SynchronizeSetViewmodel {
    return new SynchronizeSetViewmodel(task, this.basicDataService);
  }
  //#endregion
}
