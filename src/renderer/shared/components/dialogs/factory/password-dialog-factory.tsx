import { IOverlayService } from "../../../context";
import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import * as ChangePassword from "../change-password-dialog";
import * as RecoverPassword from "../recover-password-dialog";
import * as ResetDialog from "../reset-password-dialog";

export function showChangePasswordDialog(
  viewmodelFactory: IAuthenticationViewmodelFactory,
  overlayService: IOverlayService,
  userName: string,
  email: string
): void {
  const viewmodel = viewmodelFactory.getChangePasswordViewmodel(userName, email);
  const dialogProps: ChangePassword.ChangePasswordDialogProps = {
    isOpen: true,
    title: "Change Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: ChangePassword.ChangePasswordDialogBodyProps) => {
      return (<ChangePassword.ChangePasswordDialogBody {...props} />);
    },
    footerRenderer: (props: ChangePassword.ChangePasswordDialogFooterProps) => {
      return (<ChangePassword.ChangePasswordDialogFooter {...props} />);
    }
  };
  overlayService.openDialog(dialogProps);
}

export function showRecoverPasswordDialog(
  viewmodelFactory: IAuthenticationViewmodelFactory,
  overlayService: IOverlayService
): void {
  const viewmodel = viewmodelFactory.getRecoverPasswordViewmodel({ userNameOrEmail: "" });
  const dialogProps: RecoverPassword.RecoverPasswordDialogProps = {
    isOpen: true,
    title: "Recover Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: RecoverPassword.RecoverPasswordDialogBodyProps) => {
      return (<RecoverPassword.RecoverPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: RecoverPassword.RecoverPasswordDialogFooterProps) => {
      return (<RecoverPassword.RecoverPasswordDialogFooter {...props} />);
    }
  };
  overlayService.openDialog(dialogProps);
}

export function showResetPasswordDialog(
  viewmodelFactory: IAuthenticationViewmodelFactory,
  overlayService: IOverlayService
): void {
  const viewmodel = viewmodelFactory.getResetPasswordViewmodel({
    email: "", userName: "", password: "", passwordRepeat: "", resetToken: ""
  });
  const dialogProps: ResetDialog.ResetPasswordDialogProps = {
    isOpen: true,
    title: "Reset Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: ResetDialog.ResetPasswordDialogBodyProps) => {
      return (<ResetDialog.ResetPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: ResetDialog.ResetPasswordDialogFooterProps) => {
      return (<ResetDialog.ResetPasswordDialogFooter {...props} />);
    }
  };
  overlayService.openDialog(dialogProps);
}
