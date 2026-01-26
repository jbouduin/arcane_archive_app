import { ContextMenu, Menu, MenuDivider, MenuItem, ToastProps } from "@blueprintjs/core";
import { useServices } from "../../../../hooks";
import { showNewCollectionCardDialog } from "./collection-card-dialog";
import { CollectionTreeContextMenuProps } from "./collection-tree-context-menu.props";

export function CollectionTreeContextMenu(props: CollectionTreeContextMenuProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { overlayService, displayValueService } = useServices();
  //#endregion

  // #region Event handling ---------------------------------------------------
  function onShowDetails(_collectinId: number): void {
    const props: ToastProps = {
      message: "Not implemented",
      intent: "danger"
    };
    overlayService.showToast(props, "Detail view not implemented");
  }
  //#endregion

  // #region Rendering --------------------------------------------------------
  return (
    <ContextMenu
      key={`context-menu-${props.collection.id}`}
      className="tree-view-item"
      content={
        (
          <Menu key={`menu-${props.collection.id}`}>
            <MenuItem
              key="edit"
              onClick={
                (e) => {
                  e.preventDefault();
                  props.onEditCollection(props.collection, props.parentCollection, props.parentPath);
                }
              }
              text="Edit"
            />
            {
              props.collection.type != "FOLDER" &&
              (
                <>
                  <MenuItem

                    key="details"
                    onClick={
                      (e) => {
                        e.preventDefault();
                        onShowDetails(props.collection.id!);
                      }
                    }
                    text="Details"
                  />
                  <MenuItem
                    key="addCard"
                    onClick={
                      (e) => {
                        e.preventDefault();
                        showNewCollectionCardDialog(overlayService, displayValueService, props.collection.id!);
                      }
                    }
                    text="Add card"
                  />
                </>
              )
            }
            {
              props.collection.type == "FOLDER" &&
              (
                <>
                  <MenuDivider key="sep-1" />
                  <MenuItem
                    key="add-folder"
                    onClick={
                      (e) => {
                        e.preventDefault();
                        props.onAddFolder(props.collection, props.parentPath);
                      }
                    }
                    text="Add Folder"
                  />
                  <MenuItem
                    key="add-collection"
                    onClick={
                      (e) => {
                        e.preventDefault();
                        props.onAddCollection(props.collection, props.parentPath);
                      }
                    }
                    text="Add Collection"
                  />
                </>
              )
            }
            <MenuDivider key="sep-2" />
            <MenuItem
              key="delete"
              disabled={props.hasChildren}
              onClick={
                (e) => {
                  e.preventDefault();
                  props.onDeleteCollection(props.collection);
                }
              }
              text="Delete"
            />

          </Menu>
        )
      }
    >
      {props.children}
    </ContextMenu>
  );
  // #endregion
}
