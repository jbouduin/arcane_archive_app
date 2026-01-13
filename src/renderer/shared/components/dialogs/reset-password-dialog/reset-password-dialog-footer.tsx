import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useServices } from "../../../../hooks";
import { ResetPasswordRequestDto } from "../../../dto";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { showLoginDialog, showRecoverPasswordDialog } from "../factory";
import { ResetPasswordDialogFooterProps } from "./reset-password-dialog.props";

export function ResetPasswordDialogFooter(props: ResetPasswordDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function sendClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: ResetPasswordRequestDto): Promise<void> {
    // return Promise.resolve();
    return serviceContainer.sessionService.resetPassword(
      serviceContainer.arcaneArchiveProxy,
      dto
    ).then(
      () => {
        props.onClose?.(event);
        showLoginDialog(serviceContainer, false);
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
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter
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
