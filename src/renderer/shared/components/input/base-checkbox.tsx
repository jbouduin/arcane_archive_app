import { Checkbox } from "@blueprintjs/core";
import { BaseCheckBoxProps } from "./base-checkbox.props";
import { handleBooleanChange } from "../util/handle-boolean-change";

export function BaseCheckbox<Dto extends object>(props: BaseCheckBoxProps<Dto>) {
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
