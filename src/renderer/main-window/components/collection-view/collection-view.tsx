import { H1 } from "@blueprintjs/core";
import { useServices, useSession } from "../../../hooks";
import { NotLoggedInView } from "../../../shared/components/not-logged-view/not-logged-in-view";
import { CollectionViewProps } from "./collection-view.props";

export function CollectionView(props: CollectionViewProps) {
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
            <H1>Collection View</H1>
            <p>
              {"You are logged in as " + serviceContainer.sessionService.userName}
            </p>
          </div>
        )
      }
      {
        !loggedIn && (
          <NotLoggedInView {...props} />
        )
      }
    </>
  );
  // #endregion
}
