import { LogLevel } from "../../../../common/enums";
import { MainLogSetting, ResponseLogSetting } from "../../../../common/types";
import { SelectOption } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class LogSettingViewmodel<T extends MainLogSetting | ResponseLogSetting> extends BaseViewmodel<T> {
  // #region Constructor ------------------------------------------------------
  public constructor(dto: T, mode: ViewmodelMode, logLevelOptions: Array<SelectOption<LogLevel>>) {
    super(dto, mode);
    this.registerSelectOptions("level", logLevelOptions);
  }
  // #endregion
}

export type MainLogSettingViewmodel = LogSettingViewmodel<MainLogSetting>;
export type ResponseLogSettingViewmodel = LogSettingViewmodel<ResponseLogSetting>;
