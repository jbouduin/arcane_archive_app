import { AlertProps, Button, Callout, H4 } from "@blueprintjs/core";
import { useApiStatus, useServices } from "../../../hooks";
import { showLoginDialog, showRegisterDialog } from "../dialogs/factory";
import { NotLoggedInViewProps } from "./not-logged-in-view.props";

export function NotLoggedInView(props: NotLoggedInViewProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { authenticationServiceAvailable, deckServiceAvailable } = useApiStatus();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(): void {
    void showLoginDialog(serviceContainer, true);
  }

  function registerClick(): void {
    showRegisterDialog(serviceContainer, true);
  }

  function testSplash(): void {
    serviceContainer.overlayService.showSplashScreen("Hold on for 10 seconds");
    new Promise((resolve) => {
      setTimeout(resolve, 10000);
    }).then(() => serviceContainer.overlayService.hideSplashSceen());
  }

  async function testSplashWithCountDown(): Promise<void> {
    let cnt = 10;
    while (cnt > 0) {
      serviceContainer.overlayService.showSplashScreen(`Hold on for ${cnt} seconds`);
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      cnt--;
    }
    serviceContainer.overlayService.hideSplashSceen();
  }

  function testAlert(): void {
    const alertProps: AlertProps = {
      icon: "airplane",
      children: "This is a test alert",
      canEscapeKeyCancel: true,
      canOutsideClickCancel: false,
      isOpen: true
    };
    serviceContainer.overlayService.showAlert(alertProps);
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="not-logged-in-wrapper">
      {
        (props.server == "collection" || deckServiceAvailable) &&
        (
          <>
            <H4>You are not logged in</H4>
            {
              authenticationServiceAvailable &&
              (
                <>
                  <p>Please login or register in order to continue.</p>
                  <p>
                    <Button onClick={loginClick}>Login</Button>
                    <Button onClick={registerClick}> Register</Button>
                  </p>
                </>
              )
            }
            {
              !authenticationServiceAvailable &&
              (
                <Callout intent="warning">
                  Login is currently not possible
                </Callout>
              )
            }
          </>
        )
      }
      {
        (props.server == "deck" && !deckServiceAvailable) &&
        (
          <Callout intent="warning">
            Deck service is not available
          </Callout>
        )
      }
      <p>
        Test splash screen
      </p>
      <p>
        <Button onClick={testSplash}>Show Splash Screen</Button>
        <Button onClick={testSplashWithCountDown}>Show Splash Screen with countdown</Button>
      </p>
      <p>
        Test Alert
      </p>
      <p>
        <Button onClick={testAlert}>Alert</Button>
      </p>
    </div>
  );
  // #endregion
}
