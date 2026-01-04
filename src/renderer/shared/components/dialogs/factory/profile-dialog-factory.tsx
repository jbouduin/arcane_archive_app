import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { UserDto } from "../../../dto";
import { ProfileDialogBody } from "../profile-dialog/profile-dialog-body";
import { ProfileDialogFooter } from "../profile-dialog/profile-dialog-footer";
import { ProfileDialogBodyProps, ProfileDialogFooterProps, ProfileDialogProps } from "../profile-dialog/profile-dialog-props";

export function showProfileDialog(serviceContainer: IServiceContainer): void {
  void serviceContainer.arcaneArchiveProxy
    .getData<UserDto>("authentication", "/app/account")
    .then(
      (userDto: UserDto) => {
        const profileProp: ProfileDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Profile",
          viewmodel: serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getUserViewmodel(userDto),
          bodyRenderer: (bodyProps: ProfileDialogBodyProps) => {
            return (<ProfileDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: ProfileDialogFooterProps) => {
            return (<ProfileDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialog(profileProp);
      },
      noop
    );
}
