import { LogLevel } from "../../../../common/enums";
import { LogSetting } from "../../../../common/types";
import { SelectOption } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class LogSettingViewmodel extends BaseViewmodel<LogSetting> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: LogSetting, mode: ViewmodelMode, logLevelOptions: Array<SelectOption<LogLevel>>) {
    super(dto, mode);
    this.registerSelectOptions("level", logLevelOptions);
  }
  // #endregion
}
