import { Props } from "@blueprintjs/core";
import { ProgressCallbackValue } from "../../../../common/ipc";

export interface SplashScreenProps extends Props {
  callBackValue: ProgressCallbackValue;
}
