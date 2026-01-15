import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { RegisterViewmodel } from "../../../viewmodel";
import { RegisterDialogBodyNew } from "../register-dialog/register-dialog-body-new";
import { RegisterDialogFooterNew } from "../register-dialog/register-dialog-footer-new";
import { RegisterDialogBodyPropsNew, RegisterDialogFooterPropsNew, RegisterDialogPropsNew } from "../register-dialog/register-dialog.props";

export function showRegisterDialogNew(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
  // the viewmodel factory goes to the backend to retrieve an available user name for the new user
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getRegisterViewmodelNew(showLoginButton, serviceContainer)
    .then(
      (viewmodel: RegisterViewmodel) => {
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
