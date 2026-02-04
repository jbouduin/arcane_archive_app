import { H1 } from "@blueprintjs/core";
import { useApiStatus, useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import {
  ServiceNotAvailableView
} from "../../../shared/components/service-not-available-view/service-not-available-view";
import { DeckViewProps } from "./deck-view.props";

export function DeckView(props: DeckViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn, userName } = useSession();
  const { deckServiceAvailable } = useApiStatus();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        !deckServiceAvailable && <ServiceNotAvailableView serviceName="Deck service" />
      }
      {

        deckServiceAvailable && loggedIn && (
          <div className="not-logged-in-wrapper">
            <H1>Deck View</H1>
            <p>
              {"You are logged in as " + userName}
            </p>
          </div>
        )
      }
      {
        deckServiceAvailable && !loggedIn && (
          <NotLoggedInView {...props} />
        )
      }
    </>
  );
  // #endregion
}
