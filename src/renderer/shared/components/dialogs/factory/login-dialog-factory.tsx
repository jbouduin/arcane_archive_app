import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { LoginViewmodel } from "../../../viewmodel";
import * as LoginDialog from "../login-dialog";

export function showLoginDialog(serviceContainer: IServiceContainer, showRegisterButton: boolean): void {
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getLoginViewmodel(showRegisterButton, serviceContainer)
    .then(
      (viewmodel: LoginViewmodel) => {
        const loginDialogProps: LoginDialog.LoginDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Login",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: LoginDialog.LoginDialogBodyProps) => {
            return (<LoginDialog.LoginDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: LoginDialog.LoginDialogFooterProps) => {
            return (<LoginDialog.LoginDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialogNew(loginDialogProps);
      },
      noop
    );
}
