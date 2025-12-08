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
    [touched, props.value]
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
    >
      <InputGroup
        {...props}
        id={props.keyPrefix + "-input"}
        onBlur={() => setTouched(true)}
        onChange={props.onChange}
        required={props.required}
        size={props.size || "small"}
      />
    </FormGroup>
  );
  // #endregion
}
