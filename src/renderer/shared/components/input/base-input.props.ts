import { InputGroupProps, NumericInputProps } from "@blueprintjs/core";
import { BaseProps } from "./base.props";
import { ValidationType } from "./validation-type";

export interface BaseInputProps<Dto extends object> extends BaseProps<Dto> {
  /**
   * Set which validations have to be executed. If the validation has not been registered
   * an exception will be thrown, resp. the promise will be rejected.
   * Defaults to "none"
   */
  validation?: ValidationType;
  /**
   * Debounce validation. Use for async as well as for sync validations
   */
  debounceMs?: number;
  /**
   * If set, ValidatedInput renders an {@link InputGroup}. Mutually exclusive with numericInputProps
   */
  inputProps?: InputGroupProps;
  // #endregion

  // #region Input related ----------------------------------------------------
  /**
   * If set, ValidatedInput renders an {@link NumericInput}. Mutually exclusive with InputProps
   */
  numericInputProps?: NumericInputProps;
  /**
   * Only used on InputGroup. Default: <i>false</i>
   */
  useRightElement?: boolean;
  // #endregion
}
