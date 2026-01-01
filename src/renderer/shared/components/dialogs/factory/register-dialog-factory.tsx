import { IServiceContainer } from "../../../context";
import { RegisterDialogBody } from "../register-dialog/register-dialog-body";
import { RegisterDialogFooter } from "../register-dialog/register-dialog-footer";
import { RegisterDialogBodyProps, RegisterDialogFooterProps, RegisterDialogProps } from "../register-dialog/register-dialog-props";

export async function showRegisterDialog(serviceContainer: IServiceContainer, showLoginButton: boolean): Promise<void> {
  const viewmodel = await serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getRegisterViewmodel(showLoginButton, serviceContainer);
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
}
