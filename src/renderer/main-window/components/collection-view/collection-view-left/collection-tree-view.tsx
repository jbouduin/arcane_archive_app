import { ContextMenu, Divider, Icon, Menu, MenuItem, TreeNodeInfo } from "@blueprintjs/core";
import { noop } from "lodash";
import { useEffect, useState } from "react";
import { useDialogs, usePreferences, useServices } from "../../../../hooks";
import { AaTree } from "../../../../shared/components/base/aa-tree";
import { CollectionDto } from "../../../../shared/dto";
import { CollectionTreeViewmodel } from "../../../../shared/viewmodel";
import { CollectionTreeContextMenu } from "./collection-tree-context.menu";
import { CollectionTreeViewProps } from "./collection-tree-view.props";

export function CollectionTreeView(props: CollectionTreeViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { collectionService, overlayService, viewmodelFactoryService } = useServices();
  const { preferences } = usePreferences();
  const { showEditCollectionDialog, showNewCollectionDialog } = useDialogs();
  //#endregion

  //#region State -------------------------------------------------------------
  const [collections, setCollections] = useState<Array<CollectionTreeViewmodel>>(new Array<CollectionTreeViewmodel>());
  const [rootCollection, setRootCollection] = useState<CollectionDto | null>(null);
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onCollectionAdded(dto: CollectionDto): void {
    const viewmodel = viewmodelFactoryService.collectionViewmodelFactory
      .getCollectionTreeViewmodel(dto);
    setCollections([...collections, viewmodel]);
    /**
     * # NOW if (dto.parentId != null) {
     * //   props.expandedNodes.add(dto.parentId);
     * //   props.expandedNodesChanged(props.expandedNodes);
     * // }
     */
    props.viewmodel.dto.collectionIds.splice(0);
    props.viewmodel.dto.collectionIds.push(dto.id!);
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
              props.viewmodel.dto.collectionIds.filter((id: number) => id != collection.id);
              /**
               * # NOW if (collection.parentId != null) {
               * //   props.viewmodel.dto.collectionIds.push(collection.parentId);
               * //   props.expandedNodesChanged(props.expandedNodes);
               * // }
               */
            }
          }
          );
      },
    });
  }
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      void collectionService.loadCollections()
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
                    showNewCollectionDialog("FOLDER", rootCollection!, onCollectionAdded);
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
                    showNewCollectionDialog("COLLECTION", rootCollection!, onCollectionAdded);
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
                    void collectionService.importCollectionData(overlayService, preferences.cardConditions);
                  }
                }
              />
            </Menu>
          )
        }
      >
        <AaTree<CollectionTreeViewmodel, object>
          data={collections}
          filterProps={{ filter: {}, applyFilterProps: (data: Array<CollectionTreeViewmodel>) => data }}
          buildTree={buildTree}
          dataSelectionChanged={
            (collection: CollectionTreeViewmodel, selected: boolean, clearOthers: boolean) => {
              if (clearOthers) {
                props.viewmodel.dto.collectionIds.splice(0);
              }
              if (selected) {
                props.viewmodel.dto.collectionIds.push(collection.id);
              } else {
                props.viewmodel.dto.collectionIds =
                  props.viewmodel.dto.collectionIds.filter((id: number) => id != collection.id);
              }
              props.viewmodelChanged();
            }
          }
          nodeExpandedChanged={noop}
        /**
         * # NOW (collection: TreeNodeInfo<CollectionTreeViewmodel>, expanded: boolean) => {
         *   if (expanded) {
         *       props.expandedNodes.add(collection.nodeData!.id);
         *             //   } else {
         *               //     props.expandedNodes.delete(collection.nodeData!.id);
         *               //   }
         *               //   props.expandedNodesChanged(props.expandedNodes);
         *               // }
         */
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
    data: Array<CollectionTreeViewmodel>, _filterProps: object | undefined
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
          onAddCollection={(parent: CollectionDto) => showNewCollectionDialog("COLLECTION", parent, onCollectionAdded)}
          onAddFolder={(parent: CollectionDto) => showNewCollectionDialog("FOLDER", parent, onCollectionAdded)}
          onDeleteCollection={onDeleteCollection}
          onEditCollection={(collection: CollectionDto, parent: CollectionDto) =>
            showEditCollectionDialog(collection, parent, onCollectionModified)}
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
            !collection.folder &&
            (
              <Icon
                icon="box"
                key="icon"
                style={{ width: "26px", height: "26px", alignContent: "center", paddingRight: "5px" }}
              />
            )
          }
          <div key="name" style={{ alignContent: "center" }}>
            {collection.name}
          </div>
        </CollectionTreeContextMenu>
      ),
      // NOW isExpanded: props.expandedNodes.has(collection.id),
      isSelected: props.viewmodel.dto.collectionIds.includes(collection.id),
      nodeData: collection
    };
    return node;
  }
  //#endregion
}
