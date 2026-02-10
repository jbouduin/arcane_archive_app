import { ButtonGroup, Menu, MenuItem, ToastProps } from "@blueprintjs/core";
import { useApiStatus, useDialogs, usePreferences, useServices, useSession } from "../../../../hooks";
import {
  showPreferencesDialog, showProfileDialog, showSystemInfoDialog, showSystemSettingsDialog
} from "../../../../shared/components/dialogs/factory";
import { EDesktopView } from "../desktop-view.enum";
import { ButtonBarButton } from "./button-bar-button";
import { EButtonBarButtonType } from "./button-bar-button-type.enum";
import { ButtonBarProps } from "./button-bar.props";

export function ButtonBar(props: ButtonBarProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const apiInfo = useApiStatus();
  const { loggedIn, userName, email, isSysAdmin } = useSession();
  const serviceContainer = useServices();
  const { preferences } = usePreferences();
  const { showLoginDialog, showChangePasswordDialog } = useDialogs();
  // #endregion

  //#region Event handling ----------------------------------------------------
  function loginClick(): void {
    showLoginDialog(true);
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
  //#endregion

  //#region Rendering ---------------------------------------------------------
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
            position="top-right"
          />
        </ButtonGroup>
      </div>
    </>
  );

  function renderSettingsMenu(): JSX.Element {
    return (
      <Menu size="small">
        <MenuItem
          onClick={() => showPreferencesDialog(serviceContainer, preferences)}
          text="Preferences"
        />
        <MenuItem text="Cache">
          <MenuItem
            onClick={() => serviceContainer.cardSymbolService.refreshCardSymbols(serviceContainer)}
            text="Refresh Card Symbols"
          />
          <MenuItem
            onClick={() => {
              serviceContainer.overlayService.showToast(
                { intent: "warning", message: "Feature not Implemented" });
            }}
            text="Refresh Card Images"
          />
        </MenuItem>
        <MenuItem text="System">
          <MenuItem onClick={() => showSystemSettingsDialog(serviceContainer, false)} text="Settings" />
          <MenuItem onClick={() => showSystemInfoDialog(apiInfo, serviceContainer)} text="Info" />
          {
            isSysAdmin && <MenuItem onClick={adminClick} text="Admin" />
          }
        </MenuItem>
      </Menu>
    );
  }

  function renderLoggedInMenu(): React.JSX.Element {
    return (
      <Menu size="small">
        <MenuItem onClick={() => showProfileDialog(serviceContainer)} text="User Profile" />
        <MenuItem
          onClick={
            () => showChangePasswordDialog(userName!, email!)
          }
          text="Change Password"
        />
        <MenuItem onClick={logoutClick} text="Log out" />
      </Menu>
    );
  }

  function renderNotLoggedInMenu(): React.JSX.Element {
    return (
      <Menu size="small">
        <MenuItem
          disabled={!apiInfo.authenticationServiceAvailable}
          onClick={loginClick}
          text={apiInfo.authenticationServiceAvailable ? "Log in" : "Log in (service not available)"}
        />
      </Menu>
    );
  }
  //#endregion
}
