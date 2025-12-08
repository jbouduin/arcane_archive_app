import { ButtonGroup, Menu, MenuItem, ToastProps } from "@blueprintjs/core";
import { noop } from "lodash";
import * as React from "react";
import { ResultDto } from "../../../../../common/dto/mtg-collection";
import { useServices, useSession } from "../../../../hooks";
import { BaseDialogBodyProps, BaseDialogProps } from "../../../../shared/components/base/base-dialog";
import { LoginDialogBody } from "../../../../shared/components/dialogs/login-view/login-dialog-body";
import { LoginDialogFooter } from "../../../../shared/components/dialogs/login-view/login-dialog-footer";
import { ProfileDialogBody } from "../../../../shared/components/dialogs/profile-dialog/profile-dialog-body";
import { ProfileDialogFooter } from "../../../../shared/components/dialogs/profile-dialog/profile-dialog-footer";
import { SettingsDialogBody } from "../../../../shared/components/dialogs/settings-dialog/settings-dialog-body";
import { SettingsDialogFooter } from "../../../../shared/components/dialogs/settings-dialog/settings-dialog-footer";
import { LoginRequestDto } from "../../../../shared/dto";
import { LoginViewmodel } from "../../../../shared/viewmodel";
import { EDesktopView } from "../desktop-view.enum";
import { ButtonBarButton } from "./button-bar-button";
import { EButtonBarButtonType } from "./button-bar-button-type.enum";
import { ButtonBarProps } from "./button-bar.props";

// TODO active view white, inactive views mute
export function ButtonBar(props: ButtonBarProps) {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling -------------------------------------------------------------
  function loginClick(): void {
    const loginDialogProps: BaseDialogProps<LoginRequestDto> = {
      isOpen: true,
      isCloseButtonShown: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      title: "Login",
      viewmodel: new LoginViewmodel(
        {
          user: "sys_admi",
          password: "sys_admin"
        }
      ),
      bodyRenderer: (bodyProps: BaseDialogBodyProps<LoginRequestDto>) => {
        return (<LoginDialogBody key="body" {...bodyProps} />);
      },
      footerRenderer: (footerProps: BaseDialogProps<LoginRequestDto>) => {
        return (<LoginDialogFooter key="footer" {...footerProps} />);
      }
    };
    serviceContainer.dialogService.openDialog(loginDialogProps);
  }

  function logoutClick(): void {
    serviceContainer.collectionManagerProxy
      .postData<never, ResultDto<never>>("authentication", "/auth/logout", null, false)
      .then(
        (_r: ResultDto<never>) => serviceContainer.sessionService.setSessionData(null),
        noop
      );
  }

  function uiSettingsClick(): void {
    const uiSettingsProps: BaseDialogProps<LoginRequestDto> = {
      isOpen: true,
      isCloseButtonShown: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      title: "UI Settings",
      viewmodel: new LoginViewmodel(
        {
          user: "sys_admi",
          password: "sys_admin"
        }
      ),
      bodyRenderer: (bodyProps: BaseDialogBodyProps<LoginRequestDto>) => {
        return (<SettingsDialogBody key="body" {...bodyProps} />);
      },
      footerRenderer: (footerProps: BaseDialogProps<LoginRequestDto>) => {
        return (<SettingsDialogFooter key="footer" {...footerProps} />);
      }
    };
    serviceContainer.dialogService.openDialog(uiSettingsProps);
  }

  function profileClick(): void {
    const profileProp: BaseDialogProps<LoginRequestDto> = {
      isOpen: true,
      isCloseButtonShown: true,
      canEscapeKeyClose: true,
      canOutsideClickClose: false,
      title: "Profile",
      viewmodel: new LoginViewmodel(
        {
          user: "sys_admi",
          password: "sys_admin"
        }
      ),
      bodyRenderer: (bodyProps: BaseDialogBodyProps<LoginRequestDto>) => {
        return (<ProfileDialogBody key="body" {...bodyProps} />);
      },
      footerRenderer: (footerProps: BaseDialogProps<LoginRequestDto>) => {
        return (<ProfileDialogFooter key="footer" {...footerProps} />);
      }
    };
    serviceContainer.dialogService.openDialog(profileProp);
  }

  function adminClick(): void {
    const props: ToastProps = {
      message: "Not implemented",
      intent: "danger"
    };
    serviceContainer.dialogService.showToast(props, "admin not implemented");
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <div className="button-bar">
        <ButtonGroup variant="minimal" vertical={true}>
          <ButtonBarButton
            assetPath="assets/img/mtg.svg"
            buttonType={EButtonBarButtonType.TooltipButton}
            desktopView={EDesktopView.Library}
            onButtonClick={(desktopView: EDesktopView) => props.onDesktopViewSelectionClick(desktopView)}
            tooltip={<span>Magic the Gathering Database</span>}
          />
          <ButtonBarButton
            assetPath="assets/img/collection.svg"
            buttonType={EButtonBarButtonType.TooltipButton}
            desktopView={EDesktopView.Collection}
            onButtonClick={(desktopView: EDesktopView) => props.onDesktopViewSelectionClick(desktopView)}
            tooltip={<span>Collections</span>}
          />
          <ButtonBarButton
            assetPath="assets/img/deck.svg"
            buttonType={EButtonBarButtonType.TooltipButton}
            desktopView={EDesktopView.Deck}
            onButtonClick={(desktopView: EDesktopView) => props.onDesktopViewSelectionClick(desktopView)}
            tooltip={<span>Decks</span>}
          />
        </ButtonGroup>
        <ButtonGroup variant="minimal" vertical={true}>
          {
            loggedIn && (
              <ButtonBarButton
                assetPath="assets/img/logged-in.svg"
                buttonType={EButtonBarButtonType.MenuButton}
                menu={renderLoggedInMenu()}
              />
            )
          }
          {
            !loggedIn && (
              <ButtonBarButton
                assetPath="assets/img/login.svg"
                buttonType={EButtonBarButtonType.MenuButton}
                menu={renderNotLoggedInMenu()}
              />
            )
          }
          <ButtonBarButton
            assetPath="assets/img/settings.svg"
            buttonType={EButtonBarButtonType.MenuButton}
            menu={renderSettingsMenu()}
          />
        </ButtonGroup>
      </div>
    </>
  );

  function renderSettingsMenu(): React.JSX.Element {
    return (
      <Menu size="small">
        <MenuItem onClick={uiSettingsClick} text="UI Settings" />
        {
          serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") &&
          <MenuItem onClick={adminClick} text="Admin" />
        }
      </Menu>
    );
  }

  function renderLoggedInMenu(): React.JSX.Element {
    return (
      <Menu size="small">
        <MenuItem onClick={profileClick} text="User Profile" />
        <MenuItem onClick={logoutClick} text="Log out" />
      </Menu>
    );
  }
  function renderNotLoggedInMenu(): React.JSX.Element {
    return (
      <Menu size="small">
        <MenuItem onClick={loginClick} text="Log in" />
      </Menu>
    );
  }
  // #endregion
}
