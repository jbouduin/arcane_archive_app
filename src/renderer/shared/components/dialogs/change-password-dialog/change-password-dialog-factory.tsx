import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import { ChangePasswordDialogBody } from "./change-password-dialog-body";
import { ChangePasswordDialogFooter } from "./change-password-dialog-footer";
import * as DialogProps from "./change-password-dialog.props";

function getChangePasswordDialogPropsImpl(
  userName: string,
  email: string,
  viewmodelFactory: IAuthenticationViewmodelFactory
): DialogProps.ChangePasswordDialogProps {
  const viewmodel = viewmodelFactory.getChangePasswordViewmodel(userName, email);
  const dialogProps: DialogProps.ChangePasswordDialogProps = {
    isOpen: true,
    title: "Change Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: DialogProps.ChangePasswordDialogBodyProps) => {
      return (<ChangePasswordDialogBody {...props} />);
    },
    footerRenderer: (props: DialogProps.ChangePasswordDialogFooterProps) => {
      return (<ChangePasswordDialogFooter {...props} />);
    }
  };
  return dialogProps;
}

export const ChangePasswordDialogPropsFactory = {
  getChangePasswordDialogProps: getChangePasswordDialogPropsImpl
};
