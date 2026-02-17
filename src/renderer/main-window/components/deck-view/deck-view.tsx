import { useApiStatus, useSession } from "../../../hooks";
import { NotLoggedIn } from "../../../shared/components/not-logged-in";
import { ServiceNotAvailable } from "../../../shared/components/service-not-available";
import { DeckViewProps } from "./deck-view.props";

export function DeckView(props: DeckViewProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn } = useSession();
  const { deckServiceAvailable } = useApiStatus();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        !deckServiceAvailable && <ServiceNotAvailable serviceName="Deck service" />
      }
      {
        deckServiceAvailable && !loggedIn && (
          <NotLoggedIn {...props} />
        )
      }
    </>
  );
  // #endregion
}
