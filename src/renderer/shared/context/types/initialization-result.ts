import { ToastProps } from "@blueprintjs/core";
import { SettingsDto } from "../../../../common/dto";

export type InitializationResult = {
  settings?: SettingsDto;
  isOk: boolean;
  errors: Array<ToastProps>;
};
