import { ContextMenu, Icon, Menu, MenuItem, TreeNodeInfo } from "@blueprintjs/core";
import { isEqual } from "lodash";
import { memo, useEffect, useState } from "react";
import { useServices } from "../../../../hooks";
import { BaseTreeView, BaseTreeViewProps } from "../../../../shared/components/base/base-tree-view";
import { showEditCollectionDialog, showNewCollectionDialog } from "../../../../shared/components/dialogs/factory";
import { CollectionDto } from "../../../../shared/dto";
import { CollectionTreeViewmodel } from "../../../../shared/viewmodel";
import { CollectionTreeContextMenu } from "./collection-tree-context.menu";
import { CollectionTreeViewProps } from "./collection-tree-view.props";

/**
 * This memoization is required because otherwise nodes collapse when selecting a childnode
 */
/* eslint-disable  @typescript-eslint/no-empty-object-type */
const TreeView = memo(
  BaseTreeView<CollectionTreeViewmodel, {}>,
  (prev: BaseTreeViewProps<CollectionTreeViewmodel, {}>, next: BaseTreeViewProps<CollectionTreeViewmodel, {}>) => {
    return isEqual(prev.data, next.data);
  }
);

export function CollectionTreeView(props: CollectionTreeViewProps): JSX.Element {
  //#region State -------------------------------------------------------------
  const [collections, setCollections] = useState<Array<CollectionTreeViewmodel>>(new Array<CollectionTreeViewmodel>());
  // TODO store expanded nodes and selected node and check if we solve the bug in basetreeeview with that

  //#endregion

  //#region Hooks -------------------------------------------------------------
  const serviceContainer = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onAddCollection(parentCollection: CollectionDto | null, parentPath: Array<string>): void {
    showNewCollectionDialog(serviceContainer, "COLLECTION", parentCollection, parentPath, onCollectionAdded);
  }

  function onAddFolder(parentCollection: CollectionDto | null, parentPath: Array<string>): void {
    showNewCollectionDialog(serviceContainer, "FOLDER", parentCollection, parentPath, onCollectionAdded);
  }

  function onCollectionAdded(dto: CollectionDto): void {
    const viewmodel = serviceContainer.viewmodelFactoryService.collectionViewmodelFactory
      .getCollectionTreeViewmodel(dto);
    setCollections([...collections, viewmodel]);
  }

  function onCollectionModified(dto: CollectionDto): void {
    const viewmodel = serviceContainer.viewmodelFactoryService.collectionViewmodelFactory
      .getCollectionTreeViewmodel(dto);
    const newState = collections.filter((vm: CollectionTreeViewmodel) => vm.id != dto.id);
    newState.push(viewmodel);
    setCollections(newState);
  }

  function onDeleteCollection(collection: CollectionDto): void {
    serviceContainer.overlayService.showAlert({
      isOpen: true,
      canEscapeKeyCancel: true,
      canOutsideClickCancel: true,
      confirmButtonText: "Delete",
      intent: "danger",
      cancelButtonText: "Cancel",
      icon: "trash",
      children: (
        <p>
          Are you sure you want to delete
          <b>
            {collection.code}
          </b>
          ? This can not be undone.
        </p>
      ),
      onConfirm: () => {
        void serviceContainer.collectionService
          .deleteCollection(collection.id!)
          .then((resp: number) => {
            if (resp > 0) {
              setCollections(collections.filter((vm: CollectionTreeViewmodel) => vm.id != collection.id));
            }
          }
          );
      },
    });
  }

  function onEditCollection(
    collection: CollectionDto, parentCollection: CollectionDto | null, parentPath: Array<string>
  ): void {
    showEditCollectionDialog(serviceContainer, collection, parentCollection, parentPath, onCollectionModified);
  }
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      void serviceContainer.collectionService.getCollections()
        .then(
          (collections: Array<CollectionDto>) => setCollections(
            collections.map(
              c => serviceContainer.viewmodelFactoryService.collectionViewmodelFactory.getCollectionTreeViewmodel(c)
            )
          ),
          () => setCollections(new Array<CollectionTreeViewmodel>())
        );
    },
    []
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <>
      <ContextMenu
        key="root"
        style={{ height: "100vh" }}
        content={
          (
            <Menu>
              <MenuItem
                key="add-folder"
                text="Add Folder"
                onClick={
                  (e) => {
                    e.preventDefault();
                    onAddFolder(null, new Array<string>());
                  }
                }
              />
              <MenuItem
                key="add-collection"
                text="Add Collection"
                onClick={
                  (e) => {
                    e.preventDefault();
                    onAddCollection(null, new Array<string>());
                  }
                }
              />
            </Menu>
          )
        }
      >
        <TreeView
          data={collections}
          filterProps={{ filter: {}, applyFilterProps: (data: Array<CollectionTreeViewmodel>) => data }}
          buildTree={buildTree}
          onDataSelected={
            (collections: Array<CollectionTreeViewmodel>) =>
              props.collectionSelected(collections.map((c: CollectionTreeViewmodel) => c.dto), true)
          }
        />
      </ContextMenu>
    </>
  );
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  function buildTree(
    data: Array<CollectionTreeViewmodel>, _filterProps: {} | undefined
  ): Array<TreeNodeInfo<CollectionTreeViewmodel>> {
    return buildTreeByParentRecursive(data, null);
  }

  function buildTreeByParentRecursive(
    collections: Array<CollectionTreeViewmodel>,
    parentCollection: CollectionTreeViewmodel | null
  ): Array<TreeNodeInfo<CollectionTreeViewmodel>> {
    return collections
      .filter((item: CollectionTreeViewmodel) => item.parentId == parentCollection?.id)
      .sort((a: CollectionTreeViewmodel, b: CollectionTreeViewmodel) => {
        if (a.folder && !b.folder) {
          return -1;
        } else if (!a.folder && b.folder) {
          return 1;
        } else {
          return a.code.localeCompare(b.code, undefined, { caseFirst: "false" });
        }
      })
      .map((collection: CollectionTreeViewmodel) => {
        collection.path = parentCollection != null
          ? new Array<string>(...parentCollection.path, collection.code)
          : new Array<string>(collection.code);

        const childNodes: Array<TreeNodeInfo<CollectionTreeViewmodel>> =
          buildTreeByParentRecursive(collections, collection);

        const node = mapViewmodelToTreeItem(collection, parentCollection, childNodes);
        return node;
      });
  }

  function mapViewmodelToTreeItem(
    collection: CollectionTreeViewmodel,
    parentCollection: CollectionTreeViewmodel | null,
    childNodes: Array<TreeNodeInfo<CollectionTreeViewmodel>>
  ): TreeNodeInfo<CollectionTreeViewmodel> {
    const subNodes = childNodes.length > 0 ? childNodes : undefined;
    const node: TreeNodeInfo<CollectionTreeViewmodel> = {
      id: collection.id,
      childNodes: subNodes,
      label: (
        <CollectionTreeContextMenu
          collection={collection.dto}
          parentCollection={parentCollection?.dto || null}
          parentPath={parentCollection?.path || new Array<string>()}
          hasChildren={subNodes != undefined}
          onAddCollection={onAddCollection}
          onAddFolder={onAddFolder}
          onDeleteCollection={onDeleteCollection}
          onEditCollection={onEditCollection}
        >
          {
            collection.folder &&
            (
              <Icon
                icon="folder-close"
                key="icon"
                style={{ width: "26px", height: "26px", alignContent: "center", paddingRight: "5px" }}
              />
            )
          }
          {
            // TODO find a better solution
            !collection.folder &&
            (
              <Icon
                icon="box"
                key="icon"
                style={{ width: "26px", height: "26px", alignContent: "center", paddingRight: "5px" }}
              />
            )
          }
          {/* {
            !collection.folder && collectionSvg &&
            (
              <SvgRenderer
                height={16}
                key="svg"
                svg={collectionSvg}
                width={16}
              />
            )
          } */}
          <div key="name" style={{ alignContent: "center" }}>
            {collection.code}
          </div>
        </CollectionTreeContextMenu>
      ),
      isExpanded: collection.isExpanded,
      isSelected: collection.isSelected,
      nodeData: collection
    };
    return node;
  }
  //#endregion
}
