import { FormGroup, InputGroup } from "@blueprintjs/core";
import { useMemo, useState } from "react";
import { ValidationResult } from "../../types";
import { ValidatedInputProps } from "./validated-input.props";

export function ValidatedInput(props: ValidatedInputProps) {
  // #region State ------------------------------------------------------------
  const [touched, setTouched] = useState<boolean>(false);
  // #endregion

  // #region Memo -------------------------------------------------------------
  const validation = useMemo(
    () => {
      let result: ValidationResult;
      if (touched) {
        result = props.validate();
      } else {
        result = { helperText: undefined, intent: "none" };
      }
      return result;
    },
    [touched, props.inputProps.value]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <FormGroup
      key={props.keyPrefix + "-group"}
      label={props.label}
      labelFor={props.keyPrefix + "-input"}
      labelInfo={props.labelInfo}
      fill={props.fill}
      helperText={validation.helperText}
      intent={validation.intent}
      disabled={props.inputProps.disabled}
    >
      <InputGroup
        {...props.inputProps}
        id={props.keyPrefix + "-input"}
        onBlur={() => setTouched(true)}
        size={props.inputProps.size || "small"}
      />
    </FormGroup>
  );
  // #endregion
}
