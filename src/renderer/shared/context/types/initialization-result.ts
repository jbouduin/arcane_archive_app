import { ToastProps } from "@blueprintjs/core";

export type InitializationResult = {
  isOk: boolean;
  errors: Array<ToastProps>;
};
