import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useDialogs, useServices } from "../../../../hooks";
import { RecoverPasswordRequestDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { RecoverPasswordDialogFooterProps } from "./recover-password-dialog.props";

export function RecoverPasswordDialogFooter(props: RecoverPasswordDialogFooterProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { showResetPasswordDialog } = useDialogs();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  function sendClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: RecoverPasswordRequestDto): Promise<void> {
    return serviceContainer.sessionService.recoverPassword(
      serviceContainer.arcaneArchiveProxy,
      dto
    ).then(
      () => {
        props.onClose?.(event);
        showResetPasswordDialog();
      },
      noop
    );
  }

  function haveCodeClick(event: React.SyntheticEvent<HTMLElement, Event>): void {
    props.onClose?.(event);
    showResetPasswordDialog();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <DefaultDialogFooter
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
