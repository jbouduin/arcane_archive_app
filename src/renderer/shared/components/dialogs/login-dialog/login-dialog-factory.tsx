import { IIpcProxy, ISessionService } from "../../../context";
import { IAuthenticationViewmodelFactory, LoginViewmodel } from "../../../viewmodel";
import { LoginDialogBody } from "./login-dialog-body";
import { LoginDialogFooter } from "./login-dialog-footer";
import * as DialogProps from "./login-dialog.props";

async function getLoginDialogPropsImpl(
  showRegisterButton: boolean,
  ipcProxy: IIpcProxy,
  sessionService: ISessionService,
  authenticationViewmodelFactory: IAuthenticationViewmodelFactory
): Promise<DialogProps.LoginDialogProps> {
  return getLoginViewmodelImpl(showRegisterButton, ipcProxy, sessionService, authenticationViewmodelFactory)
    .then(
      (viewmodel: LoginViewmodel) => {
        const dialogProps: DialogProps.LoginDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Login",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: DialogProps.LoginDialogBodyProps) => {
            return (<LoginDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: DialogProps.LoginDialogFooterProps) => {
            return (<LoginDialogFooter {...footerProps} />);
          }
        };
        return dialogProps;
      });
}

async function getLoginViewmodelImpl(
  showRegisterButton: boolean,
  ipcProxy: IIpcProxy,
  sessionService: ISessionService,
  authenticationViewmodelFactory: IAuthenticationViewmodelFactory
): Promise<LoginViewmodel> {
  const savedUserNames = await sessionService
    .getSavedCredentials(ipcProxy)
    .then(
      (userNames: Array<string>) => userNames,
      () => new Array<string>()
    );
  let passwordOfSingleUser = null;
  if (savedUserNames.length == 1) {
    passwordOfSingleUser = await sessionService
      .getPassword(ipcProxy, savedUserNames[0])
      .then(
        (pwd: string) => pwd,
        () => ""
      );
  }

  return authenticationViewmodelFactory
    .getLoginViewmodel(showRegisterButton, savedUserNames, passwordOfSingleUser);
}

export const loginDialogPropsFactory = {
  getLoginDialogProps: getLoginDialogPropsImpl,
  getLoginViewmodel: getLoginViewmodelImpl
};
