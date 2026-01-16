import { FormGroup, HTMLSelect } from "@blueprintjs/core";
import { useMemo } from "react";
import { SelectOption } from "../../types";
import { handleValueChange } from "../util";
import { BaseHtmlSelectProps } from "./base-html-select.props";

export function BaseHtmlSelect<Dto extends object, D extends string | number>(props: BaseHtmlSelectProps<Dto>) {
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
      fill={true}
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
