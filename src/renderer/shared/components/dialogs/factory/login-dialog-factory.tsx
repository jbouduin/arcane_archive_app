import { IServiceContainer } from "../../../context";
import { LoginRequestDto } from "../../../dto";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { LoginDialogBody } from "../login-view/login-dialog-body";
import { LoginDialogFooter } from "../login-view/login-dialog-footer";

export function showLoginDialog(serviceContainer: IServiceContainer, showRegisterButton: boolean): void {
  const loginDialogProps: BaseDialogProps<LoginRequestDto> = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Login",
    viewmodel: serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getLoginViewmodel(showRegisterButton),
    bodyRenderer: (bodyProps: BaseDialogBodyProps<LoginRequestDto>) => {
      return (<LoginDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<LoginRequestDto>) => {
      return (<LoginDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(loginDialogProps);
}
