import { ToastProps } from "@blueprintjs/core";

export type AfterSplashScreenClose = "CardSets" | "CardSymbols";
export type InitializationResult = {
  isOk: boolean;
  errors: Array<ToastProps>;
};
