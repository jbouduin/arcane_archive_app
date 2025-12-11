import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { UserDto } from "../../../dto";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { ProfileDialogBody } from "../profile-dialog/profile-dialog-body";
import { ProfileDialogFooter } from "../profile-dialog/profile-dialog-footer";

export function showProfileDialog(serviceContainer: IServiceContainer): void {
  void serviceContainer.collectionManagerProxy
    .getData<UserDto>("authentication", "/app/account")
    .then(
      (userDto: UserDto) => {
        const profileProp: BaseDialogProps<UserDto> = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Profile",
          viewmodel: serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getUserViewmodel(userDto),
          bodyRenderer: (bodyProps: BaseDialogBodyProps<UserDto>) => {
            return (<ProfileDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: BaseDialogFooterProps<UserDto>) => {
            return (<ProfileDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.dialogService.openDialog(profileProp);
      },
      noop
    );
}
