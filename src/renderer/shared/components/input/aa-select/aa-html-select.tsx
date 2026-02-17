import { FormGroup, HTMLSelect } from "@blueprintjs/core";
import { useMemo } from "react";
import { SelectOption } from "../../../types";
import { AaHtmlSelectProps } from "./aa-html-select.props";
import { handleValueChange } from "../value-change-handler";

export function AaHtmlSelect<Dto extends object, D extends string | number>(
  props: AaHtmlSelectProps<Dto>
): JSX.Element {
  // #region Memo -------------------------------------------------------------
  const options: Array<SelectOption<D>> = useMemo(
    () => props.viewmodel.getSelectOptions<D>(props.fieldName),
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  const fieldName = props.fieldName as string;
  return (
    <FormGroup
      key={fieldName}
      label={props.label}
      labelInfo={props.labelInfo}
      labelFor={`${fieldName}-select`}
      fill={props.fill}
    >
      <HTMLSelect
        {...props.selectProps}
        id={`${fieldName}-select`}
        minimal={true}
        fill={true}
        onChange={
          handleValueChange((value: D) => {
            (props.viewmodel.dto[props.fieldName] as D) = value;
            props.viewmodelChanged();
          })
        }
        options={options}
        value={props.viewmodel.dto[props.fieldName] as string}
      />
    </FormGroup>
  );
  // #endregion
}
