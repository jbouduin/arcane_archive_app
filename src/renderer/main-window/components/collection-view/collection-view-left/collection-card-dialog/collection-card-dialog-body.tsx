import { ControlGroup, HTMLTable } from "@blueprintjs/core";
import { useServices } from "../../../../../hooks";
import { BaseInput } from "../../../../../shared/components/input";
import { SelectOption } from "../../../../../shared/types";
import { CollectionCardQuantityViewmodel } from "../../../../../shared/viewmodel/collection/collection-card-quantity.viewmodel";
import { CollectionCardDialogBodyProps } from "./collection-card-dialog.props";

export function CollectionCardDialogBody(props: CollectionCardDialogBodyProps): JSX.Element {
  const { displayValueService } = useServices();

  //#region Rendering ---------------------------------------------------------
  return (
    <>
      <ControlGroup
        vertical={false}
        key="g1"
        fill={true}
      >
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="setCode"
          label="Set"
          labelInfo="*"
          inputProps={{
            placeholder: "Please enter a set code..."
          }}
        />
        <BaseInput
          viewmodel={props.viewmodel}
          viewmodelChanged={props.viewmodelChanged}
          fieldName="collectorNumber"
          label="Collector number"
          labelInfo="*"
          inputProps={{
            placeholder: "Please enter a collector number..."
          }}
        />
      </ControlGroup>

      <BaseInput
        viewmodel={props.viewmodel}
        viewmodelChanged={props.viewmodelChanged}
        fieldName="language"
        label="Language"
        labelInfo="*"
        inputProps={{
          placeholder: "Please enter a language..."
        }}
      />

      <HTMLTable
        bordered={false}
        compact={true}
        key="the_table"
        width="100%"
      >
        <thead>
          <tr>
            <td key="col1" style={{ paddingLeft: "0px" }}>Condition</td>
            <td key="col2" style={{ paddingLeft: "0px" }}>Non-Foil</td>
            <td key="col3" style={{ paddingLeft: "0px" }}>Foil</td>
          </tr>
        </thead>
        <tbody>
          {
            renderTable()
          }
        </tbody>
      </HTMLTable>
    </>
  );
  //#endregion

  function renderTable(): Array<JSX.Element> {
    return displayValueService
      .getSelectOptions("cardCondition")
      .map((condition: SelectOption<string>) => {
        return (
          <tr key={condition.value}>
            <td key="col1" style={{ paddingLeft: "0px" }}>{condition.label}</td>
            <td key="col2" style={{ paddingLeft: "0px" }}>
              {renderQuantityInput(props.viewmodel.getQuantityViewmodel(condition.value, false))}
            </td>
            <td key="col3" style={{ paddingLeft: "0px" }}>
              {renderQuantityInput(props.viewmodel.getQuantityViewmodel(condition.value, true))}
            </td>
          </tr>
        );
      });
  }

  function renderQuantityInput(viewmodel: CollectionCardQuantityViewmodel): JSX.Element {
    return (
      <BaseInput
        viewmodel={viewmodel}
        fieldName="quantity"
        viewmodelChanged={props.viewmodelChanged}
        validation="synchronous"
        numericInputProps={{
          allowNumericCharactersOnly: true,
          buttonPosition: "none",
          selectAllOnFocus: true,
          style: { maxWidth: "50px", textAlign: "right" },
          min: 0
        }}
      />
    );
  }
}
