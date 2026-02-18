import { SectionCard } from "@blueprintjs/core";
import { AaCheckbox, AaHtmlSelect } from "../../input";
import { SynchronizeSetDialogBodyProps } from "./synchronize-set-dialog.props";

export function SynchronizeSetDialogBody(props: SynchronizeSetDialogBodyProps): JSX.Element {
  //#region Initialization ----------------------------------------------------
  const taskViewmodel = props.viewmodel.syncSetTaskViewModel;
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <SectionCard padded={false}>
      <AaHtmlSelect
        fieldName="mode"
        label="Synchronization mode"
        viewmodel={taskViewmodel}
        viewmodelChanged={props.viewmodelChanged}
      />
      <AaCheckbox
        fieldName="dumpData"
        viewmodel={taskViewmodel}
        viewmodelChanged={props.viewmodelChanged}
      >
        Dump data
      </AaCheckbox>
    </SectionCard>
  );
  //#endregion
}
