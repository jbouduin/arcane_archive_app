import { Props } from "@blueprintjs/core";
import { ReactNode } from "react";

export interface CardDetailSectionProps extends Props {
  beforeTitle?: JSX.Element;
  collapsible?: boolean;
  children: ReactNode;
  cardSymbols?: Array<string>;
  size: "small" | "large";
  subtitle?: JSX.Element | string;
  title: JSX.Element | string;
}
