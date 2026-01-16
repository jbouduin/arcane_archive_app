import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { RegisterViewmodel } from "../../../viewmodel";
import * as RegisterDialog from "../register-dialog";

export function showRegisterDialog(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
  // the viewmodel factory goes to the backend to retrieve an available user name for the new user
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getRegisterViewmodel(showLoginButton, serviceContainer)
    .then(
      (viewmodel: RegisterViewmodel) => {
        const loginDialogProps: RegisterDialog.RegisterDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Register",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: RegisterDialog.RegisterDialogBodyProps) => {
            return (<RegisterDialog.RegisterDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: RegisterDialog.RegisterDialogFooterProp) => {
            return (<RegisterDialog.RegisterDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialog(loginDialogProps);
      },
      noop
    );
}
