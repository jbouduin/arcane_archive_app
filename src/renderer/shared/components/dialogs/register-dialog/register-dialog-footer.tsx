import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { useDialogs, useServices } from "../../../../hooks";
import { RegisterRequestDto } from "../../../dto";
import { DefaultDialogFooter } from "../../base/base-dialog/default-dialog-footer";
import { RegisterDialogFooterProp } from "./register-dialog.props";

export function RegisterDialogFooter(props: RegisterDialogFooterProp): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  const { showLoginDialog } = useDialogs();
  //#endregion

  //#region Event handling ----------------------------------------------------
  function registerClick(e: React.SyntheticEvent<HTMLElement, Event>, dto: RegisterRequestDto): Promise<void> {
    return serviceContainer.sessionService
      .register(serviceContainer.arcaneArchiveProxy, dto)
      .then(
        () => {
          if (props.onClose) {
            props.onClose(e);
          }
        },
        noop
      );
  }

  function loginClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (props.onClose) {
      props.onClose(e);
    }
    showLoginDialog(false);
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter
      additionalLeftButtons={additionalLeftButtons()}
      {...props}
      showResetButton={true}
      commitButtonLabel="Register"
      commitButtonIcon="new-person"
      onCommitButtonClick={registerClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      props.viewmodel.showLoginButton &&
      (
        <Button
          key="login"
          icon="log-in"
          onClick={loginClick}
        >
          Log in
        </Button>
      )
    );
  }
  //#endregion
}
