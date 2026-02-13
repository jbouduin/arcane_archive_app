import { noop } from "lodash";
import { useDialogs, useServices } from "../../../../hooks";
import { ChangePasswordRequestDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { ChangePasswordDialogFooterProps } from "./change-password-dialog.props";

export function ChangePasswordDialogFooter(props: ChangePasswordDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  const { showLoginDialog } = useDialogs();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function changeClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: ChangePasswordRequestDto): Promise<void> {
    return serviceContainer.sessionService
      .changePassword(serviceContainer.arcaneArchiveProxy, serviceContainer.ipcProxy, dto)
      .then(
        () => {
          if (props.onClose) {
            props.onClose(event);
          }
          showLoginDialog(false);
        },
        noop
      );
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter
      {...props}
      showResetButton={false}
      commitButtonLabel="Change password"
      onCommitButtonClick={changeClick}
    />
  );
  //#endregion
}
