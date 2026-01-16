import { LogLevel } from "../../../../common/enums";
import { LogSetting } from "../../../../common/types";
import { SelectOption } from "../../types";
import { viewmodelMode } from "../base.viewmodel";
import { BaseViewmodelNew } from "../base.viewmodel-new";

export class LogSettingViewmodel extends BaseViewmodelNew<LogSetting> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: LogSetting, mode: viewmodelMode, logLevelOptions: Array<SelectOption<LogLevel>>) {
    super(dto, mode);
    this.registerSelectOptions("level", logLevelOptions);
  }
  // #endregion
}