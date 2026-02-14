import "./ownership-table.css";

import { HTMLTable } from "@blueprintjs/core";
import { CardConditionDto } from "../../dto/card-condition.dto";
import { SelectOption } from "../../types";
import { OwnershipTableProps } from "./ownership-table.props";
import { CollectionCardQuantityViewmodel } from "../../viewmodel";
import { AaInput } from "../input";

export function OwnershipTable(props: OwnershipTableProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  const rows = props.cardConditions
    .map((condition: SelectOption<CardConditionDto>) => {
      return (
        <tr key={condition.value.condition}>
          <td key="col1" className="aa-ownership">{condition.label}</td>
          <td key="col2" className="aa-ownership">
            {
              renderQuantityInput(
                props.collectionCardViewmodel.getQuantityViewmodel(condition.value.condition, false)
              )
            }
          </td>
          <td key="col3" className="aa-ownership">
            {
              renderQuantityInput(
                props.collectionCardViewmodel.getQuantityViewmodel(condition.value.condition, true)
              )
            }
          </td>
        </tr>
      );
    });
  return (
    <HTMLTable
      bordered={false}
      compact={true}
      key="the_table"
      width="100%"
      className="aa-ownership"
    >
      <thead className="aa-ownership">
        <tr>
          <td key="col1" className="aa-ownership">Condition</td>
          <td key="col2" className="aa-ownership">Non-Foil</td>
          <td key="col3" className="aa-ownership">Foil</td>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </HTMLTable>
  );

  function renderQuantityInput(viewmodel: CollectionCardQuantityViewmodel): JSX.Element {
    return (
      <AaInput
        viewmodel={viewmodel}
        fieldName="quantity"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        numericInputProps={{
          allowNumericCharactersOnly: true,
          buttonPosition: "none",
          selectAllOnFocus: true,
          style: { maxWidth: "70px", textAlign: "right" },
          min: 0
        }}
      />
    );
  }
  //#endregion
}
