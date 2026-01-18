import { Props } from "@blueprintjs/core";
import { ShowToastFn } from "../../../shared/types";

export interface MainWindowDesktopProps extends Props {
  toastCall: ShowToastFn;
}
