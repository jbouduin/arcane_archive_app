import { Button } from "@blueprintjs/core";
import { ReactNode } from "react";
import { useServices } from "../../../../hooks";
import { RegisterRequestDto } from "../../../dto";
import { RegisterViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { showLoginDialog } from "../factory";
import { RegisterDialogFooterProps } from "./register-dialog-props";
import { noop } from "lodash";

export function RegisterDialogFooter(props: RegisterDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function registerClick(e: React.SyntheticEvent<HTMLElement, Event>, dto: RegisterRequestDto) {
    return serviceContainer.sessionService.register(serviceContainer, dto)
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
    void showLoginDialog(serviceContainer, false);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<RegisterRequestDto, RegisterViewmodel>
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
  // #endregion
}
