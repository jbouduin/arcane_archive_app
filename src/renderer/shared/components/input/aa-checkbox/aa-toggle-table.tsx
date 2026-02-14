import { Classes, HTMLTable } from "@blueprintjs/core";
import classNames from "classnames";
import { SelectOption } from "../../../types";
import { AaToggleTableProps } from "./aa-toggle-table.props";
import { AaToggle } from "./aa-toggle";

export function AaToggleTable<T, Dto extends object>(props: AaToggleTableProps<T, Dto>): JSX.Element {
  //#region set defaults ------------------------------------------------------
  const bordered = props.bordered || false;
  const compact = props.compact || true;
  const width = props.width || "100%";
  const columns = props.columns || 2;
  const validation = props.validation || "none";
  //#endregion

  //#region Rendering ---------------------------------------------------------
  const table = new Array<React.JSX.Element>();
  let currentRow: Array<React.JSX.Element>;
  let idx = 0;
  props.allOptions
    .forEach((opt: SelectOption<T>) => {
      if (idx % columns == 0) {
        currentRow = new Array<React.JSX.Element>();
        table.push((
          <tr key={`row-${idx}`}>
            {currentRow}
          </tr>
        ));
      }
      const theValue: string = props.value(opt.value);
      currentRow.push((
        <td key={`cell-${theValue}`} style={{ paddingLeft: "0px" }}>
          <AaToggle
            viewmodel={props.viewmodel}
            viewmodelChanged={props.viewmodelChanged}
            fieldName={props.fieldName}
            value={theValue}
            checkBoxProps={{
              disabled: props.disabled
            }}
            onToggle={() => {
              if (validation != "none") {
                props.viewmodel.markTouched(props.fieldName);
                props.viewmodel.validate(props.fieldName);
              }
            }}
          >
            {opt.label}
          </AaToggle>
        </td>
      ));
      idx = idx + 1;
    });
  while (idx % columns != 0) {
    currentRow!.push(<td key={`cell-${idx}`} style={{ paddingLeft: "0px" }}></td>);
    idx = idx + 1;
  }

  return (
    <>
      <HTMLTable
        bordered={bordered}
        compact={compact}
        // id={props.key}
        width={width}
      >
        {
          props.tableHeader &&
          (
            <thead>
              <tr><td colSpan={columns} style={{ paddingLeft: "0px" }}>{props.tableHeader}</td></tr>
            </thead>
          )
        }
        <tbody>
          {table}
        </tbody>
      </HTMLTable>
      {renderValidation()}
    </>
  );

  function renderValidation(): JSX.Element {
    let result: JSX.Element = <></>;
    if (validation != "none") {
      const validationResult = props.viewmodel.getValidation(props.fieldName);
      if (validationResult.intent != "none") {
        result = (
          <div
            className={classNames(
              Classes.FORM_GROUP,
              Classes.intentClass(validationResult!.intent)
            )}
          >
            <div className={Classes.FORM_HELPER_TEXT}>
              {validationResult!.helperText}
            </div>
          </div>
        );
      }
    }
    return result;
  }
  //#endregion
}
