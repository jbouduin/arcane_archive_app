import { ContextMenu, Menu, MenuItem } from "@blueprintjs/core";
import { noop } from "lodash";
import { useServices, useSession } from "../../../hooks";
import { CollectionDto, MtgSetDto } from "../../dto";
import { showSetDialog } from "../dialogs/factory";
import { SetTreeContextMenuProps } from "./set-tree-context-menu.props";

export function SetTreeContextMenu(props: SetTreeContextMenuProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { collectionService, overlayService, mtgSetService, viewmodelFactoryService, sessionService } = useServices();
  const { loggedIn } = useSession();
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
                  onClick={
                    (e) => {
                      e.preventDefault();
                      collectionService.getCollections().then(
                        (collections: Array<CollectionDto>) => mtgSetService.exportToExcel(
                          props.cardSetId,
                          collections.filter((c: CollectionDto) => c.type == "COLLECTION")
                        ),
                        noop
                      );
                    }
                  }
                  text="Export to XL"
                />
              )
            }
            {
              loggedIn &&
              sessionService.hasRole("ROLE_SYS_ADMIN") &&
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
