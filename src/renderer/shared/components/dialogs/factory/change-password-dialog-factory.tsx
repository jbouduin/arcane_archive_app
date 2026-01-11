import { IServiceContainer } from "../../../context";
import { ChangePasswordDialogBody } from "../change-password-dialog/change-password-dialog-body";
import { ChangePasswordDialogFooter } from "../change-password-dialog/change-password-dialog-footer";
import { ChangePasswordDialogBodyProps, ChangePasswordDialogFooterProps, ChangePasswordDialogProps } from "../change-password-dialog/change-password-dialog.props";

export function showChangePasswordDialog(serviceContainer: IServiceContainer): void {
  const viewmodel = serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getChangePasswordViewmodel(
    serviceContainer.sessionService.userName!,
    serviceContainer.sessionService.email!
  );
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
  serviceContainer.overlayService.openDialog(dialogProps);
}
