import { Checkbox } from "@blueprintjs/core";
import { handleBooleanChange } from "../util/handle-boolean-change";
import { BaseCheckBoxProps } from "./base-checkbox.props";

/**
 * A Checkbox component for boolean properties
 *
 * @param props {@link BaseCheckBoxProps }
 */
export function BaseCheckbox<Dto extends object>(props: BaseCheckBoxProps<Dto>): JSX.Element {
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
