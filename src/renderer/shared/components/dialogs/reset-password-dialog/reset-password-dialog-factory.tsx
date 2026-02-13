import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import { ResetPasswordDialogBody } from "./reset-password-dialog-body";
import { ResetPasswordDialogFooter } from "./reset-password-dialog-footer";
import * as DialogProps from "./reset-password-dialog.props";

function getResetPasswordDialogPropsImpl(
  viewmodelFactory: IAuthenticationViewmodelFactory,
): DialogProps.ResetPasswordDialogProps {
  const viewmodel = viewmodelFactory.getResetPasswordViewmodel({
    email: "", userName: "", password: "", passwordRepeat: "", resetToken: ""
  });
  const dialogProps: DialogProps.ResetPasswordDialogProps = {
    isOpen: true,
    title: "Reset Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: DialogProps.ResetPasswordDialogBodyProps) => {
      return (<ResetPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: DialogProps.ResetPasswordDialogFooterProps) => {
      return (<ResetPasswordDialogFooter {...props} />);
    }
  };
  return dialogProps;
}

export const resetPasswordDialogPropsFactory = {
  getResetPasswordDialogProps: getResetPasswordDialogPropsImpl
};
