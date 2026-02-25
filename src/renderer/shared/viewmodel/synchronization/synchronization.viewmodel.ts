import { cloneDeep } from "lodash";
import { IBasicDataService } from "../../context";
import { SyncRequest, SyncTaskDto, SyncTaskTargetDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";
import { SyncTaskViewmodel } from "./sync-task.viewmodel";

export class SynchronizationViewmodel extends BaseViewmodel<SyncRequest> {
  private _allCatalogsSelected: boolean;
  public readonly catalogTaskViewmodels: Array<SyncTaskViewmodel>;
  public readonly nonCatalogTaskViewmodels: Array<SyncTaskViewmodel>;

  //#region BaseViewmodel overrides -------------------------------------------
  public override get dtoToSave(): SyncRequest {
    const tasks: Array<SyncTaskDto> = this.nonCatalogTaskViewmodels
      .filter((value: SyncTaskViewmodel) => value.dto.mode != "SKIP")
      .map((value: SyncTaskViewmodel) => value.dtoToSave);
    if (!this._allCatalogsSelected) {
      tasks.push(...this.catalogTaskViewmodels
        .filter((value: SyncTaskViewmodel) => value.dto.mode != "SKIP")
        .map((value: SyncTaskViewmodel) => value.dtoToSave));
    }
    return {
      ...cloneDeep(this._dto),
      tasks: tasks
    };
  }
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get allCatalogsSelected(): boolean {
    return this._allCatalogsSelected;
  }

  public set allCatalogsSelected(value: boolean) {
    this._allCatalogsSelected = value;
    if (!this.allCatalogsSelected) {
      this.dto.allScryfallCatalogs = "SKIP";
    }
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(dto: SyncRequest, targets: Array<SyncTaskTargetDto>, basicDataService: IBasicDataService) {
    super(dto, "update");
    this._allCatalogsSelected = false;
    this.catalogTaskViewmodels = new Array<SyncTaskViewmodel>();
    this.nonCatalogTaskViewmodels = new Array<SyncTaskViewmodel>();
    targets.forEach((target: SyncTaskTargetDto) => {
      const taskViewmodel = new SyncTaskViewmodel(
        { dumpData: false, mode: "SKIP", subTarget: null, target: target.target },
        target.displayValue,
        basicDataService
      );
      this.registerChildViewmodel(taskViewmodel);
      if (target.catalog) {
        this.catalogTaskViewmodels.push(taskViewmodel);
      } else {
        this.nonCatalogTaskViewmodels.push(taskViewmodel);
      }
    });
    this.registerSelectOptions("allCardSets", basicDataService.getSelectOptions("syncTaskMode"));
    this.registerSelectOptions("allScryfallCatalogs", basicDataService.getSelectOptions("syncTaskMode"));
  }
  //#endregion
}
