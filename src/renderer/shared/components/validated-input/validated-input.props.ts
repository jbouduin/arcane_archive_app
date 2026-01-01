import { InputGroupProps, NumericInputProps, Props } from "@blueprintjs/core";
import { ValidationResult } from "../../types";

export interface ValidatedInputProps extends Props {
  /**
   * Debounce validation
   */
  debounceMs?: number;
  fill?: boolean;
  /**
   * If set, ValidatedInput renders an {@link InputGroup}. Mutually exclusive with numericInputProps
   */
  inputProps?: InputGroupProps;
  keyPrefix: string;
  label: string;
  labelInfo?: string;
  /**
   * If set, ValidatedInput renders an {@link NumericInput}. Mutually exclusive with InputProps
   */
  numericInputProps?: NumericInputProps;
  touched?: boolean;
  /**
   * Only used on InputGroup. Default: <i>false</i>
   */
  useRightElement?: boolean;
  onTouchedChanged?: (touched: boolean) => void;
  validate?: () => ValidationResult;
  validateAsync?: (signal: AbortSignal) => Promise<ValidationResult>;
}
