import { IArcaneArchiveProxy } from "../../../context";
import { UserDto } from "../../../dto";
import { IAuthenticationViewmodelFactory, ProfileViewmodel } from "../../../viewmodel";
import { ProfileDialogBody } from "./profile-dialog-body";
import { ProfileDialogFooter } from "./profile-dialog-footer";
import * as DialogProps from "./profile-dialog.props";

function getProfileDialogPropsImpl(
  arcaneArchiveProxy: IArcaneArchiveProxy,
  authenticationViewmodelFactory: IAuthenticationViewmodelFactory): Promise<DialogProps.ProfileDialogProps> {
  return arcaneArchiveProxy
    .getData<UserDto>("authentication", "/auth/user")
    .then((userDto: UserDto) => {
      const viewmodel: ProfileViewmodel = authenticationViewmodelFactory.getUserViewmodel(userDto);
      const dialogProps: DialogProps.ProfileDialogProps = {
        isOpen: true,
        isCloseButtonShown: true,
        canEscapeKeyClose: true,
        canOutsideClickClose: false,
        title: "Profile",
        viewmodel: viewmodel,
        bodyRenderer: (bodyProps: DialogProps.ProfileDialogBodyProps) => {
          return (<ProfileDialogBody {...bodyProps} />);
        },
        footerRenderer: (footerProps: DialogProps.ProfileDialogFooterProps) => {
          return (<ProfileDialogFooter {...footerProps} />);
        }
      };
      return dialogProps;
    });
}

export const profileDialogPropsFactory = {
  getProfileDialogProps: getProfileDialogPropsImpl
};
