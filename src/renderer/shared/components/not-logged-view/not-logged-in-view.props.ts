import { Props } from "@blueprintjs/core";
import { MtgServer } from "../../types";

export interface NotLoggedInViewProps extends Props {
  server: MtgServer;
}
