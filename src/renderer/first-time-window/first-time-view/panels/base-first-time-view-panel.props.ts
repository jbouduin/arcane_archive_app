import { Props } from "@blueprintjs/core";
import { PanelType } from "./panel-type";

export interface BaseFirstTimeViewPanelProps extends Props {
  navigateTo: (panel: PanelType) => void;
}
