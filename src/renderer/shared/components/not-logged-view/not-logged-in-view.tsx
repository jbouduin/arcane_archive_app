import { Button, H4, Props } from "@blueprintjs/core";
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
    </div>
  );
  // #endregion
}
