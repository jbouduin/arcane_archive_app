import { Button, Callout, H4 } from "@blueprintjs/core";
import { useApiStatus, usePreferences, useServices } from "../../../hooks";
import { showLoginDialog, showRegisterDialog } from "../dialogs/factory";
import { NotLoggedInViewProps } from "./not-logged-in-view.props";

export function NotLoggedInView(props: NotLoggedInViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { preferences } = usePreferences();
  const { authenticationServiceAvailable, deckServiceAvailable } = useApiStatus();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function loginClick(): void {
    showLoginDialog(serviceContainer, true);
  }

  function registerClick(): void {
    showRegisterDialog(serviceContainer, true, preferences);
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
    </div>
  );
  // #endregion
}
