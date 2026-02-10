import { Button, Callout, H4, Props } from "@blueprintjs/core";
import { useApiStatus, useDialogs, usePreferences, useServices } from "../../../hooks";
import { showRegisterDialog } from "../dialogs/factory";

export function NotLoggedInView(_props: Props): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  const { showLoginDialog } = useDialogs();
  const { preferences } = usePreferences();
  const { authenticationServiceAvailable } = useApiStatus();
  //#endregion

  //#region Event handling ----------------------------------------------------
  function loginClick(): void {
    showLoginDialog(true);
  }

  function registerClick(): void {
    showRegisterDialog(serviceContainer, true, preferences);
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <div className="not-logged-in-wrapper">
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
    </div>
  );
  //#endregion
}
