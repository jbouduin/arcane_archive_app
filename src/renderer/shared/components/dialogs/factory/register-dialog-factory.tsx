import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { RegisterViewmodel } from "../../../viewmodel";
import { RegisterDialogBody } from "../register-dialog/register-dialog-body";
import { RegisterDialogFooter } from "../register-dialog/register-dialog-footer";
import { RegisterDialogBodyProps, RegisterDialogFooterProps, RegisterDialogProps } from "../register-dialog/register-dialog.props";

export function showRegisterDialog(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
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
