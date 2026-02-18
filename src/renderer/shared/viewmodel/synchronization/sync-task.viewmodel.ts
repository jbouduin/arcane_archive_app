import { IBasicDataService } from "../../context";
import { SyncTaskDto } from "../../dto";
import { BaseViewmodel } from "../base.viewmodel";

export class SyncTaskViewmodel extends BaseViewmodel<SyncTaskDto> {
  public readonly label: string;

  public constructor(dto: SyncTaskDto, label: string, basicDataService: IBasicDataService) {
    super(dto, "update");
    this.registerSelectOptions("mode", basicDataService.getSelectOptions("syncTaskMode"));
    this.label = label;
  }
}
