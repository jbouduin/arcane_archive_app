import { ContextMenu, Divider, Icon, Menu, MenuItem, TreeNodeInfo } from "@blueprintjs/core";
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
  const [rootCollection, setRootCollection] = useState<CollectionDto | null>(null);
  // TODO store expanded nodes and selected node and check if we solve the bug in basetreeeview with that

  //#endregion

  //#region Hooks -------------------------------------------------------------
  const { collectionService, overlayService, viewmodelFactoryService } = useServices();
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onAddCollection(parent: CollectionDto): void {
    showNewCollectionDialog(viewmodelFactoryService, overlayService, "COLLECTION", parent, onCollectionAdded);
  }

  function onAddFolder(parent: CollectionDto): void {
    showNewCollectionDialog(viewmodelFactoryService, overlayService, "FOLDER", parent, onCollectionAdded);
  }

  function onCollectionAdded(dto: CollectionDto): void {
    const viewmodel = viewmodelFactoryService.collectionViewmodelFactory
      .getCollectionTreeViewmodel(dto);
    setCollections([...collections, viewmodel]);
  }

  function onCollectionModified(dto: CollectionDto): void {
    const viewmodel = viewmodelFactoryService.collectionViewmodelFactory
      .getCollectionTreeViewmodel(dto);
    const newState = collections.filter((vm: CollectionTreeViewmodel) => vm.id != dto.id);
    newState.push(viewmodel);
    setCollections(newState);
  }

  function onDeleteCollection(collection: CollectionDto): void {
    overlayService.showAlert({
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
        void collectionService
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

  function onEditCollection(collection: CollectionDto, parentCollection: CollectionDto): void {
    showEditCollectionDialog(
      viewmodelFactoryService, overlayService, collection, parentCollection, onCollectionModified
    );
  }
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      void collectionService.getCollections()
        .then(
          (collections: Array<CollectionDto>) => {
            setCollections(
              collections.map(c => viewmodelFactoryService.collectionViewmodelFactory.getCollectionTreeViewmodel(c)));
            setRootCollection(collectionService.getRootCollection());
          },
          () => {
            setCollections(new Array<CollectionTreeViewmodel>());
            setRootCollection(null);
          }
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
                disabled={rootCollection == null}
                text="Add Folder"
                onClick={
                  (e) => {
                    e.preventDefault();
                    // NOW this should be root collection
                    onAddFolder(rootCollection!);
                  }
                }
              />
              <MenuItem
                key="add-collection"
                text="Add Collection"
                disabled={rootCollection == null}
                onClick={
                  (e) => {
                    e.preventDefault();
                    // NOW this should be root collection
                    onAddCollection(rootCollection!);
                  }
                }
              />
              <Divider />
              <MenuItem
                key="import"
                text="Import Collection Data"
                onClick={
                  (e) => {
                    e.preventDefault();
                    void collectionService.importCollectionData(overlayService);
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
  /**
   * Build the nodes for the tree. As we do not want to display the root, which is created by the system,
   * we find the root first and start buildig the tree from that root.
   * @param data all collections
   * @param _filterProps not used
   * @returns an array of {@link TreeNodeInfo}
   */
  function buildTree(
    data: Array<CollectionTreeViewmodel>, _filterProps: {} | undefined
  ): Array<TreeNodeInfo<CollectionTreeViewmodel>> {
    let result = new Array<TreeNodeInfo<CollectionTreeViewmodel>>();
    if (data.length == 0) {
      result = new Array<TreeNodeInfo<CollectionTreeViewmodel>>();
    } else {
      const root = data.find((ctvm: CollectionTreeViewmodel) => ctvm.id == rootCollection!.id);
      if (root) {
        result = buildTreeByParentRecursive(data, root!);
      }
    }
    return result;
  }

  function buildTreeByParentRecursive(
    collections: Array<CollectionTreeViewmodel>,
    parentCollection: CollectionTreeViewmodel
  ): Array<TreeNodeInfo<CollectionTreeViewmodel>> {
    return collections
      .filter((item: CollectionTreeViewmodel) => item.parentId == parentCollection.id)
      .sort((a: CollectionTreeViewmodel, b: CollectionTreeViewmodel) => {
        if (a.folder && !b.folder) {
          return -1;
        } else if (!a.folder && b.folder) {
          return 1;
        } else {
          return a.name.localeCompare(b.name, undefined, { caseFirst: "false" });
        }
      })
      .map((collection: CollectionTreeViewmodel) => {
        const childNodes: Array<TreeNodeInfo<CollectionTreeViewmodel>> =
          buildTreeByParentRecursive(collections, collection);
        const node = mapViewmodelToTreeItem(collection, parentCollection, childNodes);
        return node;
      });
  }

  function mapViewmodelToTreeItem(
    collection: CollectionTreeViewmodel,
    parentCollection: CollectionTreeViewmodel,
    childNodes: Array<TreeNodeInfo<CollectionTreeViewmodel>>
  ): TreeNodeInfo<CollectionTreeViewmodel> {
    const subNodes = childNodes.length > 0 ? childNodes : undefined;
    const node: TreeNodeInfo<CollectionTreeViewmodel> = {
      id: collection.id,
      childNodes: subNodes,
      label: (
        <CollectionTreeContextMenu
          collection={collection.dto}
          parentCollection={parentCollection.dto}
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
            // LATER find a better solution for the icon the one from the button is not good for the tree
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
            {collection.name}
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
