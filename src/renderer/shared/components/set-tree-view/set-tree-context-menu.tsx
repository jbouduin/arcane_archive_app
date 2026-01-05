import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { useServices, useSession } from "../../../hooks";
import { SyncParamDto } from "../../dto";
import { showSetDialog } from "../dialogs/factory";
import { SetTreeContextMenuProps } from "./set-tree-context-menu.props";

export function SetTreeContextMenu(props: SetTreeContextMenuProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { loggedIn } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function synchronizeSet(setCode: string) {
    const postData: SyncParamDto = {
      tasks: [
        {
          target: "CARDS_OF_CARD_SET",
          subTarget: setCode,
          mode: "NORMAL",
          dumpData: true
        }
      ],
      allScryfallCatalogs: "SKIP",
      allCardSets: "SKIP"
    };
    void serviceContainer.arcaneArchiveProxy.postData("library", "/admin/synchronization/partial", postData, true);
    // .then()
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ContextMenu
      key={`context-menu-${props.cardSetId}`}
      className="tree-view-item"
      content={
        (
          <Menu key={`menu-${props.cardSetId}`}>
            <MenuItem
              key={`prop-${props.cardSetId}`}
              onClick={
                (e) => {
                  e.preventDefault();
                  showSetDialog(serviceContainer, props.cardSetId);
                }
              }
              text="Properties"
            />
            {
              loggedIn &&
              serviceContainer.sessionService.hasRole("ROLE_SYS_ADMIN") &&
              (
                <MenuItem
                  key={`sync-${props.cardSetId}`}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      synchronizeSet(props.cardSetCode);
                    }
                  }
                  text="Synchronize cards"
                />
              )
            }
          </Menu>
        )
      }
    >
      {props.children}
    </ContextMenu>
  );
  // #endregion
}
