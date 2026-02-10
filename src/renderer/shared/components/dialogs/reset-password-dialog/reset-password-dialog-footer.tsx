import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useDialogs, useServices } from "../../../../hooks";
import { ResetPasswordRequestDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { showRecoverPasswordDialog } from "../factory";
import { ResetPasswordDialogFooterProps } from "./reset-password-dialog.props";

export function ResetPasswordDialogFooter(props: ResetPasswordDialogFooterProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { showLoginDialog } = useDialogs();
  const serviceContainer = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function sendClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: ResetPasswordRequestDto): Promise<void> {
    // return Promise.resolve();
    return serviceContainer.sessionService
      .resetPassword(
        serviceContainer.arcaneArchiveProxy,
        dto
      ).then(
        () => {
          props.onClose?.(event);
          showLoginDialog(false);
        },
        noop
      );
  }

  function newCodeClick(event: React.SyntheticEvent<HTMLElement, Event>): void {
    props.onClose?.(event);
    showRecoverPasswordDialog(
      serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory,
      serviceContainer.overlayService
    );
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter
      additionalLeftButtons={additionalLeftButtons()}
      {...props}
      showResetButton={false}
      onCommitButtonClick={sendClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      <Button
        key="new-code"
        icon="send-message"
        onClick={newCodeClick}
      >
        Send me a new code
      </Button>
    );
  }
  // #endregion
}
