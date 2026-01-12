import { IOverlayService } from "../../../context";
import { IAuthenticationViewmodelFactory } from "../../../viewmodel";
import { ChangePasswordDialogBody } from "../change-password-dialog/change-password-dialog-body";
import { ChangePasswordDialogFooter } from "../change-password-dialog/change-password-dialog-footer";
import { ChangePasswordDialogBodyProps, ChangePasswordDialogFooterProps, ChangePasswordDialogProps } from "../change-password-dialog/change-password-dialog.props";

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
