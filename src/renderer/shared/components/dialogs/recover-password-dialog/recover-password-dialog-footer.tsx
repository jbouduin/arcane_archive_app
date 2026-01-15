import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useServices } from "../../../../hooks";
import { RecoverPasswordRequestDto } from "../../../dto";
import { SaveCancelResetFooterNew } from "../../base/base-dialog";
import { showResetPasswordDialog } from "../factory";
import { RecoverPasswordDialogFooterProps } from "./recover-password-dialog.props";

export function RecoverPasswordDialogFooter(props: RecoverPasswordDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function sendClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: RecoverPasswordRequestDto): Promise<void> {
    return serviceContainer.sessionService.recoverPassword(
      serviceContainer.arcaneArchiveProxy,
      dto
    ).then(
      () => {
        props.onClose?.(event);
        showResetPasswordDialog(
          serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory,
          serviceContainer.overlayService
        );
      },
      noop
    );
  }

  function haveCodeClick(event: React.SyntheticEvent<HTMLElement, Event>): void {
    props.onClose?.(event);
    showResetPasswordDialog(
      serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory,
      serviceContainer.overlayService
    );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooterNew
      additionalLeftButtons={additionalLeftButtons()}
      {...props}
      showResetButton={false}
      commitButtonLabel="Send mail"
      commitButtonIcon="send-message"
      onCommitButtonClick={sendClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      <Button
        key="have-code"
        icon="key"
        onClick={haveCodeClick}
      >
        I have my code
      </Button>
    );
  }
  // #endregion
}
