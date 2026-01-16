import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { ProfileViewmodel } from "../../../viewmodel";
import * as Profile from "../profile-dialog";

export function showProfileDialog(serviceContainer: IServiceContainer): void {
  void serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
    .getUserViewmodel(serviceContainer.arcaneArchiveProxy)
    .then(
      (viewmodel: ProfileViewmodel) => {
        const profileProp: Profile.ProfileDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "Profile",
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: Profile.ProfileDialogBodyProps) => {
            return (<Profile.ProfileDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: Profile.ProfileDialogFooterProps) => {
            return (<Profile.ProfileDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialogNew(profileProp);
      },
      noop
    );
}
