import { Checkbox } from "@blueprintjs/core";
import { handleBooleanChange } from "../util/handle-boolean-change";
import { ToggleCheckBoxProps } from "./toggle-checkbox.props";

/**
 * A Checkbox component that adds / deletes string values from a string array
 *
 * @param props {@link ToggleCheckBoxProps }
 */
export function ToggleCheckbox<Dto extends object>(props: ToggleCheckBoxProps<Dto>) {
  // #region Rendering --------------------------------------------------------
  const dtoValue = props.viewmodel.dto[props.fieldName] as unknown as Array<string>;
  return (
    <Checkbox
      {...props.checkBoxProps}
      key={props.fieldName as string}
      checked={dtoValue.includes(props.value)}
      onChange={
        handleBooleanChange((_newValue: boolean) => {
          const indexOfValue = dtoValue.indexOf(props.value);
          if (indexOfValue >= 0) {
            dtoValue.splice(indexOfValue, 1);
          } else {
            dtoValue.push(props.value);
            dtoValue.sort();
          }
          props.viewmodelChanged();
        })
      }
    >
      {props.children}
    </Checkbox>
  );
  // #endregion
}
