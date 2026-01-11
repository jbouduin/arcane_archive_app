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

  // TODO a validated input is most probably always representing a value from a viewmodel
  /**
   * typical use
   touched = { props.viewmodel.mode == "update"}
   validationResult = { props.viewmodel.getValidation("email") }
   validate = {() => props.viewmodel.validateEmail()}
   startValidation = {() => props.viewmodel.startValidation()}
   endValidation = {() => props.viewmodel.endValidation()}
   onValidationComplete = {() => props.onValidationCompleted()}
   inputProps={{
               required: true,
               inputMode: "email",
               placeholder: "Enter your email address...",
               onChange:
                 handleStringChange((newValue: string) => {
                   props.viewmodel.email = newValue;
                   props.viewmodelChanged();
                 }),
               type: "email",
               value: props.viewmodel.email
    if you see how many times we have props.viewmodel here -> this could be better
   */

  validationResult: ValidationResult;
  onTouchedChanged?: (touched: boolean) => void;
  startValidation: () => void;
  endValidation: () => void;
  validate?: () => void;
  validateAsync?: (signal: AbortSignal) => Promise<void>;
  onValidationComplete?: () => void;
}
