import { Colors, FormGroup, Icon, InputGroup, NumericInput, Spinner } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { handleStringChange, handleValueChange } from "../util";
import { BaseInputProps } from "./base-input.props";

export function BaseInput<Dto extends object>(props: BaseInputProps<Dto>) {
  //#region State -------------------------------------------------------------
  const [loading, setLoading] = useState<boolean>(false);
  const [controller, setController] = useState<AbortController | null>(null);
  //#endregion

  //#region Effects -----------------------------------------------------------
  /**
   * Run asynchronous validation if required when the value has been updated.
   * By implementing async validation this way, the new value is rendered immediately
   */
  useEffect(
    () => {
      if (props.validation == "asynchronous" || props.validation == "both") {
        const handler = setTimeout(
          () => {
            // Cancel previous request
            if (controller) {
              controller.abort();
            }
            props.viewmodel.startValidation();
            const newController = new AbortController();
            setController(newController);
            setLoading(true);
            props.viewmodel
              .validateAsync(props.fieldName, newController.signal)
              .finally(() => {
                setLoading(false);
                props.viewmodel.endValidation();
                props.viewmodelChanged();
              });
          },
          props.debounceMs ?? 0
        );
        return () => clearTimeout(handler);
      }
    },
    [props.viewmodel.dto[props.fieldName]]
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const validationResult = props.viewmodel.getValidation(props.fieldName);
  const keyName = props.fieldName.toString();
  return (
    <FormGroup
      key={props.fieldName.toString() + "-group"}
      label={props.label}
      labelFor={keyName + "-input"}
      labelInfo={props.labelInfo}
      fill={props.fill}
      helperText={validationResult.helperText}
      intent={validationResult.intent}
      disabled={props.inputProps?.disabled || props.numericInputProps?.disabled}
    >
      {
        props.inputProps &&
        (
          <InputGroup
            {...props.inputProps}
            onChange={
              handleStringChange((newValue: string) => {
                // TODO check this assignment: probably "" could be assigned as null
                (props.viewmodel.dto[props.fieldName] as unknown as string) = newValue;
                if (props.validation == "synchronous" || props.validation == "both") {
                  props.viewmodel.validate(props.fieldName, props.debounceMs);
                }
                props.viewmodelChanged();
              })
            }
            // TODO check this assignment (see TODO above)
            value={props.viewmodel.dto[props.fieldName] as string || ""}
            id={keyName + "-input"}
            onBlur={() => {
              props.viewmodel.markTouched(props.fieldName);
              props.viewmodelChanged();
            }}
            size={props.inputProps.size || "small"}
            rightElement={props.inputProps.rightElement || renderRightElement()}
          />
        )
      }
      {
        props.numericInputProps &&
        (
          <NumericInput
            {...props.numericInputProps}
            onChange={
              handleValueChange<number>((newValue: number) => {
                (props.viewmodel.dto[props.fieldName] as unknown as number) = newValue;
                props.viewmodel.validate(props.fieldName, props.debounceMs);
                props.viewmodelChanged();
              })
            }
            id={keyName + "-input"}
            onBlur={() => {
              props.viewmodel.markTouched(props.fieldName);
              props.viewmodelChanged();
            }}
            size={props.numericInputProps.size || "small"}
            value={(props.viewmodel.dto[props.fieldName] as unknown as string)}
          />
        )
      }
    </FormGroup>
  );

  function renderRightElement(): JSX.Element | undefined {
    if (!props.useRightElement) {
      return undefined;
    }
    if (loading) {
      return (<Spinner size={16} />);
    } else if (validationResult.intent == "none") {
      return (<Icon icon="tick" size={20} color={Colors.GREEN1} />);
    } else {
      return (<Icon icon="cross" size={20} color={Colors.RED1} />);
    }
  }
  //#endregion
}
