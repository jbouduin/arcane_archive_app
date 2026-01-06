import { Classes } from "@blueprintjs/core";
import { LabelValuePanelProps } from "./label-value-panel.props";

export function LabelValuePanel(props: LabelValuePanelProps) {
  const numCol = props.columns || 1;

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {(numCol == 1) && renderSingleColumn()}
      {(numCol != 1) && renderMultiColum()}
    </>
  );

  function renderSingleColumn(): JSX.Element {
    const result = new Array<JSX.Element>();
    let idx = 0;
    props.items.forEach((valueElement: JSX.Element | null, label: string) => {
      if (valueElement != null) {
        result.push(
          (
            <div key={"key_" + idx.toString()}>
              <span className={Classes.TEXT_MUTED}>{label}</span>
              {valueElement}
            </div>
          )
        );
      } else {
        result.push(
          (
            <div key={"key_" + idx.toString()}>
              <span className={Classes.TEXT_MUTED}>&nbsp;</span>
              &nbsp;
            </div>
          )
        );
      }
      idx++;
    });
    return (
      <div className="label-value-panel" style={props.style}>
        {result}
      </div>
    );
  }

  function renderMultiColum(): JSX.Element {
    const columnMap = new Map<number, Array<JSX.Element>>();
    for (let col = 1; col <= numCol; col++) {
      columnMap.set(col, new Array<JSX.Element>());
    }

    let curCol = 1;
    let idx = 0;
    props.items.forEach((valueElement: JSX.Element | null, label: string) => {
      if (valueElement != null) {
        columnMap.get(curCol)!.push(
          (
            <div key={"key_" + idx.toString()}>
              <span className={Classes.TEXT_MUTED}>{label}</span>
              {valueElement}
            </div>
          )
        );
      } else {
        columnMap.get(curCol)!.push(
          (
            <div key={"key_" + idx.toString()}>
              <span className={Classes.TEXT_MUTED}>&nbsp;</span>
              &nbsp;
            </div>
          )
        );
      }
      if (curCol == numCol) {
        curCol = 1;
      } else {
        curCol++;
      }
      idx++;
    });

    const columns = new Array<Array<JSX.Element>>();
    columnMap.forEach((c: Array<JSX.Element>, _n: number) => columns.push(c));
    return (
      <div className="label-value-column-wrapper">
        {
          columns.map((c: Array<JSX.Element>, idx: number) => (
            <div key={"col_" + idx.toString()} className="label-value-panel" style={props.style}>
              {columns[idx]}
            </div>
          ))
        }
      </div>
    );
  }
  // #endregion
}
