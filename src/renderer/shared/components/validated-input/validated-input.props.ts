import { InputGroupProps, NumericInputProps, Props } from "@blueprintjs/core";
import { ValidationResult } from "../../types";

export interface ValidatedInputProps extends Props {
  keyPrefix: string;
  fill?: boolean;
  inputProps?: InputGroupProps;
  numericInputProps?: NumericInputProps;
  label: string;
  labelInfo?: string;
  validate: () => ValidationResult;
}
