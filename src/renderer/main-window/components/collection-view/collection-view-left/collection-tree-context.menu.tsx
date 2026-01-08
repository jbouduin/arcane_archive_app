import { ContextMenu, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { CollectionTreeContextMenuProps } from "./collection-tree-context-menu.props";

export function CollectionTreeContextMenu(props: CollectionTreeContextMenuProps) {
  // #region Event handling ---------------------------------------------------
  function onShowDetails(_collectinId: number): void {
    // TODO implement
  }

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
              !props.collection.folder &&
              (
                <MenuItem
                  key="details"
                  disabled={true}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      onShowDetails(props.collection.id);
                    }
                  }
                  text="Details"
                />
              )
            }
            {
              props.collection.folder &&
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
