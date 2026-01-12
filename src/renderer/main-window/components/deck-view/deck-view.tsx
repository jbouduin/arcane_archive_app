import { H1 } from "@blueprintjs/core";
import { useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { DeckViewProps } from "./deck-view.props";

export function DeckView(props: DeckViewProps) {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn, userName } = useSession();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        loggedIn && (
          <div className="not-logged-in-wrapper">
            <H1>Deck View</H1>
            <p>
              {"You are logged in as " + userName}
            </p>
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
