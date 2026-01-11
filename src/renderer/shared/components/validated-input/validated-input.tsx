import { Colors, FormGroup, Icon, InputGroup, NumericInput, Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { ValidatedInputProps } from "./validated-input.props";

export function ValidatedInput(props: ValidatedInputProps) {
  // #region State ------------------------------------------------------------
  const [touched, setTouched] = useState<boolean>(props.touched || false);
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);
  // #endregion

  // #region Effect: Debounced Validation -------------------------------------
  useEffect(
    () => {
      if (!touched) return;

      const handler = setTimeout(
        () => {
          // Cancel previous request if async validation is used
          if (controller) controller.abort();
          if (props.validate || props.validateAsync) {
            props.startValidation();
          }
          if (props.validateAsync) {
            const newController = new AbortController();
            setController(newController);
            setLoading(true);
            props.validateAsync(newController.signal)
              // .then(result => setValidation(result))
              // .catch((err) => {
              //   if (err.name !== "AbortError") {
              //     setValidation({ helperText: "Validation failed", intent: "danger" });
              //   }
              // })
              .finally(() => {
                setLoading(false);
                props.endValidation();
                props.onValidationComplete?.();
              });
          } else if (props.validate) {
            props.validate();
            props.endValidation();
            props.onValidationComplete?.();
          }
        },
        props.debounceMs || 0
      );

      return () => clearTimeout(handler);
    },
    [touched, props.inputProps?.value, props.numericInputProps?.value]
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
      helperText={props.validationResult.helperText}
      intent={props.validationResult.intent}
      disabled={props.inputProps?.disabled || props.numericInputProps?.disabled}
    >
      {
        props.inputProps &&
        (
          <InputGroup
            {...props.inputProps}
            id={props.keyPrefix + "-input"}
            onBlur={() => {
              setTouched(true);
              if (props.onTouchedChanged) {
                props.onTouchedChanged(true);
              }
            }}
            size={props.inputProps.size || "small"}
            rightElement={props.inputProps.rightElement || rightElement()}
          />
        )
      }
      {
        props.numericInputProps &&
        (
          <NumericInput
            {...props.numericInputProps}
            id={props.keyPrefix + "-input"}
            onBlur={() => setTouched(true)}
            size={props.numericInputProps.size || "small"}
          />
        )
      }
    </FormGroup>
  );

  function rightElement(): JSX.Element | undefined {
    if (!props.useRightElement) {
      return undefined;
    }
    if (loading) {
      return (<Spinner size={16} />);
    } else if (props.validationResult.intent == "none") {
      return (<Icon icon="tick" size={20} color={Colors.GREEN1} />);
    } else {
      return (<Icon icon="cross" size={20} color={Colors.RED1} />);
    }
  }
  // #endregion
}
