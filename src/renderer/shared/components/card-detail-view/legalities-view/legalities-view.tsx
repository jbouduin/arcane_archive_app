import { HTMLTable, Intent, Tag } from "@blueprintjs/core";
import * as React from "react";
import { compareClassNameProp } from "../../util";
import { LegalitiesViewProps } from "./legalities-view.props";

export const LegalitiesView = React.memo(
  (props: LegalitiesViewProps) => {
    // #region Rendering ------------------------------------------------------
    return (
      <HTMLTable
        bordered={false}
        compact={true}
        width="100%"
      >
        <tbody>
          {
            getTable()
          }
        </tbody>
      </HTMLTable>
    );
    // #endregion

    // #region Auxiliary functions --------------------------------------------
    function getTable(): Array<React.JSX.Element> {
      const table = new Array<React.JSX.Element>();
      let currentRow: Array<React.JSX.Element>;
      let idx = 0;
      props.legalities.forEach((value: string, key: string) => {
        if (idx % 2 == 0) {
          currentRow = new Array<React.JSX.Element>();
          currentRow.push(<td style={{ paddingLeft: "0px" }} key={`td_${idx}_${key}`}>{key}</td>);
        } else {
          currentRow.push(<td key={`td_${idx}_${key}`}>{key}</td>);
        }
        let intent: Intent;
        switch (value.toLowerCase()) {
          case "banned":
            intent = "danger";
            break;
          case "illegal":
            intent = "danger";
            break;
          case "legal":
            intent = "success";
            break;
          case "restricted":
            intent = "warning";
            break;
          default:
            intent = "none";
        }
        currentRow.push(<td style={{ paddingLeft: "0px" }} key={`td_${idx}_${value}`}><Tag fill={true} intent={intent}>{value}</Tag></td>);
        if (idx % 2 == 1) {
          table.push(<tr key={`tr_${idx}`}>{currentRow}</tr>);
        }
        idx++;
      });
      return table;
    }
    // #endregion
  },
  (prev: LegalitiesViewProps, next: LegalitiesViewProps) => {
    return prev.collectorNumber == next.collectorNumber && prev.setCode == next.setCode &&
      compareClassNameProp(prev.className || "", next.className || "");
  }
);
