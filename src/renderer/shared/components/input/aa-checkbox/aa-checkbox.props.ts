import { CheckboxProps } from "@blueprintjs/core";
import { ReactNode } from "react";
import { BaseProps } from "../base.props";

export interface AaCheckBoxProps<Dto extends object> extends Omit<BaseProps<Dto>, "label" | "labelInfo"> {
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
}
