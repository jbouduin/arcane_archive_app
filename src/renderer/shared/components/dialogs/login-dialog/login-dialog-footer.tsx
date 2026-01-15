import { AlertProps, Button, Callout } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { LoginRequestDto, LoginResponseDto } from "../../../../../common/dto";
import { useServices } from "../../../../hooks/use-services";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { showRecoverPasswordDialog, showRegisterDialogNew } from "../factory";
import { LoginDialogFooterProps } from "./login-dialog.props";

export function LoginDialogFooter(props: LoginDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: LoginRequestDto): Promise<void> {
    return serviceContainer.sessionService.login(serviceContainer, dto)
      .then(
        (_resp: LoginResponseDto) => {
          if (props.viewmodel.nonExistinguser) {
            saveUserAlert(dto);
          } else if (props.viewmodel.modifiedPasswordOfExistingUser) {
            updateUserAlert(dto);
          }
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function registerClick(): void {
    showRegisterDialogNew(serviceContainer, false);
  }

  function saveUser(dto: LoginRequestDto): void {
    void serviceContainer.sessionService.saveCredentials(serviceContainer.ipcProxy, dto);
  }

  function recoverPasswordClick(event: React.SyntheticEvent<HTMLElement, Event>): void {
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
              onClick={registerClick}
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
