import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { useApiStatus, useDialogs, useSession } from "../../../hooks";
import { SetTreeContextMenuProps } from "./set-tree-context-menu.props";

export function SetTreeContextMenu(props: SetTreeContextMenuProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { loggedIn, isSysAdmin } = useSession();
  const { collectionServiceAvailable } = useApiStatus();
  const { showExportSetDialog, showMtgSetDialog, showSynchronizeSetDialog } = useDialogs();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ContextMenu
      key={`context-menu-${props.cardSet.id}`}
      className="aa-tree-view-item"
      content={
        (
          <Menu>
            <MenuItem
              key={`prop-${props.cardSet.id}`}
              onClick={
                (e) => {
                  e.preventDefault();
                  showMtgSetDialog(props.cardSet.id);
                }
              }
              text="Properties"
            />
            {
              loggedIn && (props.cardSet.baseSetSize + props.cardSet.totalSetSize > 0) &&
              (
                <MenuItem
                  key={`export-${props.cardSet.id}`}
                  disabled={!collectionServiceAvailable}
                  text="Export to XL"
                  onClick={
                    (e) => {
                      e.preventDefault();
                      showExportSetDialog(props.cardSet.id);
                    }
                  }
                />
              )
            }
            {
              isSysAdmin && (props.cardSet.baseSetSize + props.cardSet.totalSetSize > 0) &&
              (
                <MenuItem
                  key={`sync-${props.cardSet.id}`}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      void showSynchronizeSetDialog(props.cardSet);
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
