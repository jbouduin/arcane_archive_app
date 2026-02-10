import * as LoginDialog from ".";
import { IIpcProxy, ISessionService, IViewmodelFactoryService } from "../../../context";
import { LoginViewmodel } from "../../../viewmodel";

async function getLoginDialogPropsImpl(
  showRegisterButton: boolean,
  ipcProxy: IIpcProxy,
  sessionService: ISessionService,
  viewmodelFactoryService: IViewmodelFactoryService
): Promise<LoginDialog.LoginDialogProps> {
  return getLoginViewmodelImpl(showRegisterButton, ipcProxy, sessionService, viewmodelFactoryService)
    .then(
      (viewmodel: LoginViewmodel) => {
        const dialogProps: LoginDialog.LoginDialogProps = {
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
        return dialogProps;
      });
}

async function getLoginViewmodelImpl(
  showRegisterButton: boolean,
  ipcProxy: IIpcProxy,
  sessionService: ISessionService,
  viewmodelFactoryService: IViewmodelFactoryService): Promise<LoginViewmodel> {
  const savedUserNames = await sessionService
    .getSavedUserNames(ipcProxy)
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

  return viewmodelFactoryService.authenticationViewmodelFactory
    .getLoginViewmodel(showRegisterButton, savedUserNames, passwordOfSingleUser);
}

export const loginDialogPropsFactory = {
  getLoginDialogProps: getLoginDialogPropsImpl,
  getLoginViewmodel: getLoginViewmodelImpl
};
