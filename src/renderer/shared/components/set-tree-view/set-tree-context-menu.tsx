import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { useApiStatus, useDialogs, useServices, useSession } from "../../../hooks";
import { SetTreeContextMenuProps } from "./set-tree-context-menu.props";

export function SetTreeContextMenu(props: SetTreeContextMenuProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { mtgSetService } = useServices();
  const { loggedIn, isSysAdmin } = useSession();
  const { collectionServiceAvailable } = useApiStatus();
  const { showExportSetDialog, showMtgSetDialog } = useDialogs();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ContextMenu
      key={`context-menu-${props.cardSetId}`}
      className="aa-tree-view-item"
      content={
        (
          <Menu key={`menu-${props.cardSetId}`}>
            <MenuItem
              key={`prop-${props.cardSetId}`}
              onClick={
                (e) => {
                  e.preventDefault();
                  showMtgSetDialog(props.cardSetId);
                }
              }
              text="Properties"
            />
            {
              loggedIn &&
              (
                <MenuItem
                  key={`export-${props.cardSetId}`}
                  disabled={!collectionServiceAvailable}
                  text="Export to XL"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      showExportSetDialog(props.cardSetId);
                    }
                  }
                />
              )
            }
            {
              isSysAdmin &&
              (
                <MenuItem
                  key={`sync-${props.cardSetId}`}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      void mtgSetService.synchronizeSet(props.cardSetCode);
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
