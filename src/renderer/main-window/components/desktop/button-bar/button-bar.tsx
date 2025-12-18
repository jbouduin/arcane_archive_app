import { ButtonGroup, Menu, MenuItem, ToastProps } from "@blueprintjs/core";
import { useServices, useSession } from "../../../../hooks";
import { showLoginDialog, showPreferencesDialog, showProfileDialog, showSystemSettingsDialog } from "../../../../shared/components/dialogs/factory";
import { EDesktopView } from "../desktop-view.enum";
import { ButtonBarButton } from "./button-bar-button";
import { EButtonBarButtonType } from "./button-bar-button-type.enum";
import { ButtonBarProps } from "./button-bar.props";

export function ButtonBar(props: ButtonBarProps) {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling -------------------------------------------------------------
  function loginClick(): void {
    // TODO check if authorization service is available
    showLoginDialog(serviceContainer, true);
  }

  function logoutClick(): void {
    void serviceContainer.sessionService.logout(serviceContainer);
  }

  function adminClick(): void {
    const props: ToastProps = {
      message: "Not implemented",
      intent: "danger"
    };
    serviceContainer.overlayService.showToast(props, "admin not implemented");
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
            intent={props.currentView == EDesktopView.Library ? "primary" : undefined}
            onButtonClick={(desktopView: EDesktopView) => props.onDesktopViewSelectionClick(desktopView)}
            tooltip={<span>Magic the Gathering Database</span>}
          />
          <ButtonBarButton
            assetPath="assets/img/collection.svg"
            buttonType={EButtonBarButtonType.TooltipButton}
            desktopView={EDesktopView.Collection}
            intent={props.currentView == EDesktopView.Collection ? "primary" : undefined}
            onButtonClick={(desktopView: EDesktopView) => props.onDesktopViewSelectionClick(desktopView)}
            tooltip={<span>Collections</span>}
          />
          <ButtonBarButton
            assetPath="assets/img/deck.svg"
            buttonType={EButtonBarButtonType.TooltipButton}
            desktopView={EDesktopView.Deck}
            intent={props.currentView == EDesktopView.Deck ? "primary" : undefined}
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
        <MenuItem onClick={() => showPreferencesDialog(serviceContainer)} text="Preferences" />
        <MenuItem onClick={() => showSystemSettingsDialog(serviceContainer)} text="System Settings" />
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
        <MenuItem onClick={() => showProfileDialog(serviceContainer)} text="User Profile" />
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
