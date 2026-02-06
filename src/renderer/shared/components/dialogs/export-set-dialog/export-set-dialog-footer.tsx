import { ExportSetRequest } from "../../../../../common/dto";
import { useServices } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { ExportSetDialogFooterProps } from "./export-set-dialog.props";

export function ExportSetDialogFooter(props: ExportSetDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { mtgSetService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function exportClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: ExportSetRequest): Promise<void> {
    mtgSetService.exportToExcel(dto);
    if (props.onClose) {
      props.onClose(event);
    }
    return Promise.resolve();
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter
      {...props}
      showResetButton={false}
      commitButtonLabel="Export"
      onCommitButtonClick={exportClick}
    />
  );
  //#endregion
}
