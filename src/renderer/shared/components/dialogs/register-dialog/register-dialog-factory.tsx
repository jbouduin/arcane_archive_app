import { PreferencesDto } from "../../../../../common/dto";
import { IArcaneArchiveProxy, ISessionService } from "../../../context";
import { IAuthenticationViewmodelFactory, RegisterViewmodel } from "../../../viewmodel";
import { RegisterDialogBody } from "./register-dialog-body";
import { RegisterDialogFooter } from "./register-dialog-footer";
import * as DialogProps from "./register-dialog.props";

function getRegisterDialogPropsImpl(
  showLoginButton: boolean,
  preferences: PreferencesDto,
  authenticationViewmodelFactory: IAuthenticationViewmodelFactory,
  arcaneArchiveProxy: IArcaneArchiveProxy,
  sessionService: ISessionService
): Promise<DialogProps.RegisterDialogProps> {
  return getRegisterViewmodelImpl(
    showLoginButton,
    preferences,
    authenticationViewmodelFactory,
    arcaneArchiveProxy,
    sessionService
  ).then(
    (viewmodel: RegisterViewmodel) => {
      const dialogProps: DialogProps.RegisterDialogProps = {
        isOpen: true,
        isCloseButtonShown: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: false,
        title: "Register",
        viewmodel: viewmodel,
        bodyRenderer: (bodyProps: DialogProps.RegisterDialogBodyProps) => {
          return (<RegisterDialogBody {...bodyProps} />);
        },
        footerRenderer: (footerProps: DialogProps.RegisterDialogFooterProp) => {
          return (<RegisterDialogFooter {...footerProps} />);
        }
      };
      return dialogProps;
    }
  );
}

function getRegisterViewmodelImpl(
  showLoginButton: boolean,
  preferences: PreferencesDto,
  authenticationViewmodelFactory: IAuthenticationViewmodelFactory,
  arcaneArchiveProxy: IArcaneArchiveProxy,
  sessionService: ISessionService): Promise<RegisterViewmodel> {
  return sessionService.getNewUserName(arcaneArchiveProxy)
    .then(
      (userName: string) => authenticationViewmodelFactory.getRegisterViewmodel(
        showLoginButton, userName, preferences, arcaneArchiveProxy, sessionService)
    );
}

export const RegisterDialogPropsFactory = {
  getRegisterDialogProps: getRegisterDialogPropsImpl,
  getRegisterViewmodel: getRegisterViewmodelImpl
};
