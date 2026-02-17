import { AlertProps, Button, Callout } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { LoginRequestDto, SessionDto } from "../../../../../common/dto";
import { useDialogs, usePreferences, useServices } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { LoginDialogFooterProps } from "./login-dialog.props";

export function LoginDialogFooter(props: LoginDialogFooterProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { preferences } = usePreferences();
  const { showRecoverPasswordDialog, showRegisterDialog } = useDialogs();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: LoginRequestDto): Promise<void> {
    return serviceContainer.sessionService.login(serviceContainer, dto)
      .then(
        (_resp: SessionDto) => {
          if (props.viewmodel.nonExistingCredential) {
            saveUserAlert(dto);
          } else if (props.viewmodel.modifiedPasswordOfExistingCrredential) {
            updateUserAlert(dto);
          }
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function saveUser(dto: LoginRequestDto): void {
    void serviceContainer.sessionService.saveCredentials(serviceContainer.ipcProxy, dto);
  }

  function recoverPasswordClick(event: React.SyntheticEvent<HTMLElement, Event>): void {
    props.onClose?.(event);
    showRecoverPasswordDialog();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <DefaultDialogFooter
      additionalLeftButtons={additionalLeftButtons()}
      {...props}
      showResetButton={false}
      commitButtonLabel="Log in"
      commitButtonIcon="log-in"
      onCommitButtonClick={loginClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      <>
        {props.viewmodel.showRegisterButton &&
          (
            <Button
              key="register"
              icon="new-person"
              onClick={() => showRegisterDialog(false, preferences)}
            >
              Register
            </Button>
          )}
        <Button
          key="forgot"
          icon="key"
          onClick={recoverPasswordClick}
        >
          Recover password
        </Button>
      </>
    );
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------

  function saveUserAlert(dto: LoginRequestDto): void {
    const children: ReactNode = (
      <>
        Do you want to save this user and password combination for future use?
        <br />
        <Callout intent="warning">Do not use this feature on a public computer!</Callout>
      </>
    );
    serviceContainer.overlayService.showAlert(genericUserAlert(dto, children));
  }

  function updateUserAlert(dto: LoginRequestDto): void {
    const children: ReactNode = (
      <>
        Do you want to save the new password for this user?
      </>
    );
    serviceContainer.overlayService.showAlert(genericUserAlert(dto, children));
  }

  function genericUserAlert(dto: LoginRequestDto, children: ReactNode): AlertProps {
    return {
      isOpen: true,
      canEscapeKeyCancel: true,
      canOutsideClickCancel: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      icon: "confirm",
      onConfirm: () => saveUser(dto),
      children: children
    };
  }
  // #endregion
}
