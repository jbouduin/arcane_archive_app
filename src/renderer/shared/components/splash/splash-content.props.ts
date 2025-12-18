import { Props } from "@blueprintjs/core";
import { ProgressCallbackValue } from "../../../../common/ipc";

export interface SplashContentProps extends Props {
  callBackValue: ProgressCallbackValue;
}
