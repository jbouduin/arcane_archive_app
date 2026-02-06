import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { useApiStatus, usePreferences, useServices, useSession } from "../../../hooks";
import { MtgSetDto } from "../../dto";
import { showExportSetDialog, showSetDialog } from "../dialogs/factory";
import { SetTreeContextMenuProps } from "./set-tree-context-menu.props";

export function SetTreeContextMenu(props: SetTreeContextMenuProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { collectionService, overlayService, mtgSetService, viewmodelFactoryService } = useServices();
  const { loggedIn, isSysAdmin } = useSession();
  const { collectionServiceAvailable } = useApiStatus();
  const { preferences } = usePreferences();
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
                  void mtgSetService
                    .getSetDetails(props.cardSetId)
                    .then((set: MtgSetDto) => showSetDialog(set, viewmodelFactoryService, overlayService));
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
                      showExportSetDialog(
                        props.cardSetId,
                        preferences.cardConditions,
                        collectionService,
                        mtgSetService,
                        viewmodelFactoryService,
                        overlayService
                      );
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
