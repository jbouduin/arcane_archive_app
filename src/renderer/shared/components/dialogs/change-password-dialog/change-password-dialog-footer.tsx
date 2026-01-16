import { noop } from "lodash";
import { useServices } from "../../../../hooks";
import { ChangePasswordRequestDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { showLoginDialog } from "../factory";
import { ChangePasswordDialogFooterProps } from "./change-password-dialog.props";

export function ChangePasswordDialogFooter(props: ChangePasswordDialogFooterProps) {
  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
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
          showLoginDialog(serviceContainer, false);
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
