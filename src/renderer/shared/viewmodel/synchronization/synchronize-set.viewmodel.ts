import { IBasicDataService } from "../../context";
import { SyncRequest, SyncTaskDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";
import { SyncTaskViewmodel } from "./sync-task.viewmodel";

export class SynchronizeSetViewmodel extends BaseViewmodel<SyncRequest> {
  private _syncSetTaskViewModel: SyncTaskViewmodel;

  //#region Getters/Setters ---------------------------------------------------
  public get syncSetTaskViewModel(): SyncTaskViewmodel {
    return this._syncSetTaskViewModel;
  }
  //#endregion

  //#region BaseViewmodel overrides -------------------------------------------
  public override get hasChanges(): boolean {
    return true;
  }

  public override get dtoToSave(): SyncRequest {
    return {
      ...this.dto,
      tasks: [this._syncSetTaskViewModel.dtoToSave]
    };
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(task: SyncTaskDto, basicDataService: IBasicDataService) {
    super(
      {
        tasks: [task],
        allScryfallCatalogs: "SKIP",
        allCardSets: "SKIP"
      },
      "update"
    );
    this._syncSetTaskViewModel = new SyncTaskViewmodel(task, "", basicDataService);
    this.registerChildViewmodel(this._syncSetTaskViewModel);
  }
  //#endregion
}
