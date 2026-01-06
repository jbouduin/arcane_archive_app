import { Button, H1 } from "@blueprintjs/core";
import { useServices, useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { DeckViewProps } from "./deck-view.props";

export function DeckView(props: DeckViewProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { loggedIn } = useSession();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        loggedIn && (
          <div className="not-logged-in-wrapper">
            <H1>Deck View</H1>
            <p>
              {"You are logged in as " + serviceContainer.sessionService.userName}
            </p>
            <div style={{ alignContent: "center" }}>
              <Button
                onClick={() => serviceContainer.sessionService.refreshToken(serviceContainer)}
              >
                Test Refresh JWT
              </Button>
            </div>
          </div>
        )
      }
      {
        !loggedIn && (
          <NotLoggedInView {...props} server="deck" />
        )
      }
    </>
  );
  // #endregion
}
