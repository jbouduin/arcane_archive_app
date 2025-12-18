import { IServiceContainer } from "../../../context";
import { LoginDialogBody } from "../login-dialog/login-dialog-body";
import { LoginDialogFooter } from "../login-dialog/login-dialog-footer";
import { LoginDialogBodyProps, LoginDialogFooterProps, LoginDialogProps } from "../login-dialog/login-dialog.props";

export function showLoginDialog(serviceContainer: IServiceContainer, showRegisterButton: boolean): void {
  const loginDialogProps: LoginDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Login",
    viewmodel: serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getLoginViewmodel(showRegisterButton),
    bodyRenderer: (bodyProps: LoginDialogBodyProps) => {
      return (<LoginDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: LoginDialogFooterProps) => {
      return (<LoginDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialog(loginDialogProps);
}
