import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import { RecoverPasswordDialogBody } from "./recover-password-dialog-body";
import { RecoverPasswordDialogFooter } from "./recover-password-dialog-footer";
import * as DialogProps from "./recover-password-dialog.props";

function getRecoverPasswordDialogPropsImpl(
  viewmodelFactory: IAuthenticationViewmodelFactory
): DialogProps.RecoverPasswordDialogProps {
  const viewmodel = viewmodelFactory.getRecoverPasswordViewmodel({ userNameOrEmail: "" });
  const dialogProps: DialogProps.RecoverPasswordDialogProps = {
    isOpen: true,
    title: "Recover Password",
    viewmodel: viewmodel,
    bodyRenderer: (props: DialogProps.RecoverPasswordDialogBodyProps) => {
      return (<RecoverPasswordDialogBody {...props} />);
    },
    footerRenderer: (props: DialogProps.RecoverPasswordDialogFooterProps) => {
      return (<RecoverPasswordDialogFooter {...props} />);
    }
  };
  return dialogProps;
}

export const recoverPasswordDialogPropsFactory = {
  getRecoverPasswordDialogProps: getRecoverPasswordDialogPropsImpl
};
