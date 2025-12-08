import { InputGroupProps } from "@blueprintjs/core";
import { ValidationResult } from "../../types";

export interface ValidatedInputProps extends InputGroupProps {
  keyPrefix: string;
  label: string;
  labelInfo?: string;
  validate: () => ValidationResult;
}
