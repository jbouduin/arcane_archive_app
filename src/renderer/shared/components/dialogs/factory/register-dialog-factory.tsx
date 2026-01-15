import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { RegisterViewmodel } from "../../../viewmodel";
import { RegisterDialogBody } from "../register-dialog/register-dialog-body";
import { RegisterDialogFooter } from "../register-dialog/register-dialog-footer";
import { RegisterDialogBodyProps, RegisterDialogBodyPropsNew, RegisterDialogFooterProps, RegisterDialogFooterPropsNew, RegisterDialogProps, RegisterDialogPropsNew } from "../register-dialog/register-dialog.props";
import { RegisterViewmodelNew } from "../../../viewmodel/authentication/register.viewmodel-new";
import { RegisterDialogBodyNew } from "../register-dialog/register-dialog-body-new";
import { RegisterDialogFooterNew } from "../register-dialog/register-dialog-footer-new";

export function showRegisterDialog(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
  // the viewmodel factory goes to the backend to retrieve an available user name for the new user
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getRegisterViewmodel(showLoginButton, serviceContainer)
    .then(
      (viewmodel: RegisterViewmodel) => {
        const loginDialogProps: RegisterDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Register",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: RegisterDialogBodyProps) => {
            return (<RegisterDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: RegisterDialogFooterProps) => {
            return (<RegisterDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialog(loginDialogProps);
      },
      noop
    );
}

export function showRegisterDialogNew(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
  // the viewmodel factory goes to the backend to retrieve an available user name for the new user
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getRegisterViewmodelNew(showLoginButton, serviceContainer)
    .then(
      (viewmodel: RegisterViewmodelNew) => {
        const loginDialogProps: RegisterDialogPropsNew = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Register",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: RegisterDialogBodyPropsNew) => {
            return (<RegisterDialogBodyNew {...bodyProps} />);
          },
          footerRenderer: (footerProps: RegisterDialogFooterPropsNew) => {
            return (<RegisterDialogFooterNew {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialogNew(loginDialogProps);
      },
      noop
    );
}
