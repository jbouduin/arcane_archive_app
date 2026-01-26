import { CheckboxProps } from "@blueprintjs/core";
import { ReactNode } from "react";
import { BaseProps } from "./base.props";

export interface ToggleCheckBoxProps<Dto extends object> extends Omit<BaseProps<Dto>, "label" | "labelInfo"> {
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
  value: string;
}
