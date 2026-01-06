import { Props } from "@blueprintjs/core";
import { CSSProperties } from "react";

export interface LabelValuePanelProps extends Props {
  items: Map<string, JSX.Element | null>;
  columns?: number;
  style?: CSSProperties;
}
