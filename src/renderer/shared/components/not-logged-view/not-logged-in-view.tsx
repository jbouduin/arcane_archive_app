import { Button, Callout, H4, Props } from "@blueprintjs/core";
import { useApiStatus, useDialogs, usePreferences } from "../../../hooks";

export function NotLoggedInView(_props: Props): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { showLoginDialog, showRegisterDialog } = useDialogs();
  const { preferences } = usePreferences();
  const { authenticationServiceAvailable } = useApiStatus();
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
                <Button onClick={() => showLoginDialog(true)}>Login</Button>
                <Button onClick={() => showRegisterDialog(true, preferences)}> Register</Button>
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
