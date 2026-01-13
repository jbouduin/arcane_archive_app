import { IOverlayService } from "../../../context";
import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import { ChangePasswordDialogBody } from "../change-password-dialog/change-password-dialog-body";
import { ChangePasswordDialogFooter } from "../change-password-dialog/change-password-dialog-footer";
import { ChangePasswordDialogBodyProps, ChangePasswordDialogFooterProps, ChangePasswordDialogProps } from "../change-password-dialog/change-password-dialog.props";
import { RecoverPasswordDialogBody } from "../recover-password-dialog/recover-password-dialog-body";
import { RecoverPasswordDialogFooter } from "../recover-password-dialog/recover-password-dialog-footer";
import { RecoverPasswordDialogBodyProps, RecoverPasswordDialogFooterProps, RecoverPasswordDialogProps } from "../recover-password-dialog/recover-password-dialog.props";
import { ResetPasswordDialogBody } from "../reset-password-dialog/reset-password-dialog-body";
import { ResetPasswordDialogFooter } from "../reset-password-dialog/reset-password-dialog-footer";
import { ResetPasswordDialogBodyProps, ResetPasswordDialogFooterProps, ResetPasswordDialogProps } from "../reset-password-dialog/reset-password-dialog.props";

export function showChangePasswordDialog(
  viewmodelFactory: IAuthenticationViewmodelFactory,
  overlayService: IOverlayService,
  userName: string,
  email: string
): void {
  const viewmodel = viewmodelFactory.getChangePasswordViewmodel(userName, email);
  const dialogProps: ChangePasswordDialogProps = {
    isOpen: true,
    title: "Change Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: ChangePasswordDialogBodyProps) => {
      return (<ChangePasswordDialogBody {...props} />);
    },
    footerRenderer: (props: ChangePasswordDialogFooterProps) => {
      return (<ChangePasswordDialogFooter {...props} />);
    }
  };
  overlayService.openDialog(dialogProps);
}

export function showRecoverPasswordDialog(
  viewmodelFactory: IAuthenticationViewmodelFactory,
  overlayService: IOverlayService
): void {
  const viewmodel = viewmodelFactory.getRecoverPasswordViewmodel({ userNameOrEmail: "" });
  const dialogProps: RecoverPasswordDialogProps = {
    isOpen: true,
    title: "Recover Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: RecoverPasswordDialogBodyProps) => {
      return (<RecoverPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: RecoverPasswordDialogFooterProps) => {
      return (<RecoverPasswordDialogFooter {...props} />);
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
  const dialogProps: ResetPasswordDialogProps = {
    isOpen: true,
    title: "Reset Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: ResetPasswordDialogBodyProps) => {
      return (<ResetPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: ResetPasswordDialogFooterProps) => {
      return (<ResetPasswordDialogFooter {...props} />);
    }
  };
  overlayService.openDialog(dialogProps);
}
