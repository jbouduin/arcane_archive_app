import { Checkbox } from "@blueprintjs/core";
import { AaCheckBoxProps } from "./aa-checkbox.props";
import { handleBooleanChange } from "../value-change-handler";

/**
 * A Checkbox component for boolean properties
 *
 * @param props {@link AaCheckBoxProps }
 */
export function AaCheckbox<Dto extends object>(props: AaCheckBoxProps<Dto>): JSX.Element {
  return (
    <Checkbox
      {...props.checkBoxProps}
      checked={props.viewmodel.dto[props.fieldName] as unknown as boolean}
      onChange={
        handleBooleanChange((newValue: boolean) => {
          (props.viewmodel.dto[props.fieldName] as unknown as boolean) = newValue;
          props.viewmodelChanged();
        })
      }
    >
      {props.children}
    </Checkbox>
  );
}
