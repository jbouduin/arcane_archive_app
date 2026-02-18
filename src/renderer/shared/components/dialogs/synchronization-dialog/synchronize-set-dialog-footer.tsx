import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { SyncRequest } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { SynchronizeSetDialogFooterProps } from "./synchronize-set-dialog.props";

export function SynchronizeSetDialogFooter(props: SynchronizeSetDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { synchronizeService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function synchronizeClicck(e: React.SyntheticEvent<HTMLElement, Event>, dto: SyncRequest): Promise<void> {
    return synchronizeService.synchronize(dto)
      .then(
        () => {
          if (props.onClose) {
            props.onClose(e);
          }
        },
        noop
      );
  }

  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter
      {...props}
      showResetButton={false}
      commitButtonLabel="Synchronize"
      commitButtonIcon="refresh"
      onCommitButtonClick={synchronizeClicck}
    />
  );
  //#endregion
}
