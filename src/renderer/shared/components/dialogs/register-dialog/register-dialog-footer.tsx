import { Button } from "@blueprintjs/core";
import React, { ReactNode } from "react";
import { useServices } from "../../../../hooks";
import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";
import { showLoginDialog } from "../factory";

export function RegisterDialogFooter(props: BaseDialogFooterProps<RegisterRequestDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick(e: React.SyntheticEvent<HTMLElement, Event>, dto: RegisterRequestDto) {
    return serviceContainer.sessionService.register(serviceContainer, dto)
      .then(() => {
        if (props.onClose) {
          props.onClose(e);
        }
      });
  }

  function loginClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (props.onClose) {
      props.onClose(e);
    }
    showLoginDialog(serviceContainer, false);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<RegisterRequestDto>
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
      (props.viewmodel as RegisterViewmodel).showLoginButton &&
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
  // #endregion
}
