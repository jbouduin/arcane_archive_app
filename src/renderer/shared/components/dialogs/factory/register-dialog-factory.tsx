import { IServiceContainer } from "../../../context";
import { RegisterRequestDto } from "../../../dto";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { RegisterDialogBody } from "../register-dialog/register-dialog-body";
import { RegisterDialogFooter } from "../register-dialog/register-dialog-footer";

export function showRegisterDialog(serviceContainer: IServiceContainer, showLoginButton: boolean): void {
  const loginDialogProps: BaseDialogProps<RegisterRequestDto> = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Register",
    viewmodel: serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getRegisterViewmodel(showLoginButton),
    bodyRenderer: (bodyProps: BaseDialogBodyProps<RegisterRequestDto>) => {
      return (<RegisterDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<RegisterRequestDto>) => {
      return (<RegisterDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(loginDialogProps);
}
