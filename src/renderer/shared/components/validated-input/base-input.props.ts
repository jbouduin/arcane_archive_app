import { InputGroupProps, NumericInputProps, Props } from "@blueprintjs/core";
import { BaseViewmodelNew } from "../../viewmodel/base.viewmodel-new";
import { ValidationType } from "./validation-type";

export interface BaseInputProps<Dto extends object> extends Props {
  // #region Data related -----------------------------------------------------
  /**
   * The viewmodel
   */
  viewmodel: BaseViewmodelNew<Dto>;
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  viewmodelChanged: () => void;
  // #endregion

  // #region Validation related -----------------------------------------------
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
  // #endregion

  // #region FormGroup related ------------------------------------------------
  fill?: boolean;
  /**
   * If set, ValidatedInput renders an {@link InputGroup}. Mutually exclusive with numericInputProps
   */
  inputProps?: InputGroupProps;
  label: string;
  labelInfo?: string;
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
