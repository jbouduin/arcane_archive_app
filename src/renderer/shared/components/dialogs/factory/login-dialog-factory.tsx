import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { LoginViewmodel } from "../../../viewmodel";
import { LoginDialogBody } from "../login-dialog/login-dialog-body";
import { LoginDialogFooter } from "../login-dialog/login-dialog-footer";
import { LoginDialogBodyProps, LoginDialogFooterProps, LoginDialogProps } from "../login-dialog/login-dialog.props";

export function showLoginDialog(serviceContainer: IServiceContainer, showRegisterButton: boolean): void {
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getLoginViewmodel(showRegisterButton, serviceContainer)
    .then(
      (viewmodel: LoginViewmodel) => {
        const loginDialogProps: LoginDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Login",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: LoginDialogBodyProps) => {
            return (<LoginDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: LoginDialogFooterProps) => {
            return (<LoginDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialog(loginDialogProps);
      },
      noop
    );
}
