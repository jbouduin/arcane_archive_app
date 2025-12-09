import { InputGroupProps, Props } from "@blueprintjs/core";
import { ValidationResult } from "../../types";

export interface ValidatedInputProps extends Props {
  keyPrefix: string;
  fill?: boolean;
  inputProps: InputGroupProps;
  label: string;
  labelInfo?: string;
  validate: () => ValidationResult;
}
