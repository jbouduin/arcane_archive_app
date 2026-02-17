import { Checkbox } from "@blueprintjs/core";
import { AaToggleProps } from "./aa-toggle.props";
import { handleBooleanChange } from "../value-change-handler";

/**
 * A Checkbox component that adds / deletes string values from a string array
 *
 * @param props {@link AaToggleProps }
 */
export function AaToggle<Dto extends object>(props: AaToggleProps<Dto>): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  const dtoValue = props.viewmodel.dto[props.fieldName] as unknown as Array<string>;
  return (
    <Checkbox
      {...props.checkBoxProps}
      key={props.fieldName as string}
      checked={dtoValue.includes(props.value)}
      onChange={
        handleBooleanChange((newValue: boolean) => {
          const indexOfValue = dtoValue.indexOf(props.value);
          if (indexOfValue >= 0) {
            dtoValue.splice(indexOfValue, 1);
          } else {
            dtoValue.push(props.value);
            dtoValue.sort();
          }
          if (props.onToggle) {
            props.onToggle(newValue);
          }
          props.viewmodelChanged();
        })
      }
    >
      {props.children}
    </Checkbox>
  );
  //#endregion
}
