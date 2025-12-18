import { AlertProps, Button, H4, Props } from "@blueprintjs/core";
import { useServices } from "../../../hooks";
import { showLoginDialog, showRegisterDialog } from "../dialogs/factory";

// TODO check if authentication service is available
export function NotLoggedInView(_props: Props) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(): void {
    showLoginDialog(serviceContainer, true);
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
      <H4>You are not logged in</H4>
      <p>Please login or register in order to continue.</p>
      <p>
        <Button onClick={loginClick}>Login</Button>
        <Button onClick={registerClick}> Register</Button>
      </p>
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
