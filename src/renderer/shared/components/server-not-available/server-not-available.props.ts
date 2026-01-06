import { Props } from "@blueprintjs/core";
import { InitializationResult } from "../../context";

export interface ServerNotAvailableProps extends Props {
  nextTry: number;
  initializationResult: InitializationResult;
}
