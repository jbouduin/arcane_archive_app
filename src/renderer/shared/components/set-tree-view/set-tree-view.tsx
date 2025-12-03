import { ContextMenu, Menu, MenuItem, TreeNodeInfo } from "@blueprintjs/core";
import classNames from "classnames";
import { cloneDeep, isEqual, upperFirst } from "lodash";
import React from "react";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";
import { useServices } from "../../../hooks/use-services";
import { MtgSetTreeConfigurationViewmodel } from "../../viewmodel";
import { MtgSetTreeViewmodel } from "../../viewmodel/mtg-set/mtg-set-tree.viewmodel";
import { BaseTreeView, BaseTreeViewProps } from "../base/base-tree-view";
import { HeaderView } from "./header-view";
import { SetTreeViewProps } from "./set-tree-view.props";
import { SyncParamDto } from "../../dto";

const Treeview = React.memo(
  BaseTreeView<MtgSetTreeViewmodel, MtgSetTreeConfigurationViewmodel>,
  (prev: BaseTreeViewProps<MtgSetTreeViewmodel, MtgSetTreeConfigurationViewmodel>, next: BaseTreeViewProps<MtgSetTreeViewmodel, MtgSetTreeConfigurationViewmodel>) => {
    return isEqual(prev.data?.length, next.data?.length) && isEqual(prev.filterProps.filter, next.filterProps.filter);
  }
);

export function SetTreeView(props: SetTreeViewProps) {
  // #region State ------------------------------------------------------------
  const [state, setState] = React.useState<MtgSetTreeConfigurationViewmodel>(props.configuration);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event Handling ---------------------------------------------------
  const onTextFilterChanged = (textFilterValue: string) => {
    const newState = cloneDeep(state);
    newState.cardSetFilterValue = textFilterValue;
    setState(newState);
  };

  const onCardSetSortChanged = (cardSetSort: CardSetSort) => {
    const newState = cloneDeep(state);
    newState.cardSetFilterValue = state.cardSetFilterValue;
    newState.cardSetSort = cardSetSort;
    setState(newState);
  };

  const onCardSetGroupByChanged = (cardSetGroupBy: CardSetGroupBy) => {
    const newState = cloneDeep(state);
    newState.cardSetFilterValue = state.cardSetFilterValue;
    newState.cardSetGroupBy = cardSetGroupBy;
    setState(newState);
  };

  const onCardSetTypeFilterChanged = (cardSetType: string) => {
    const newState = cloneDeep(state);
    newState.cardSetFilterValue = state.cardSetFilterValue;
    newState.toggleCardSetFilterType(cardSetType);
    setState(newState);
  };

  function applyFilterProps(data: Array<MtgSetTreeViewmodel>, filterProps: MtgSetTreeConfigurationViewmodel): Array<MtgSetTreeViewmodel> {
    // --- filter Sets by textfilter value and cardSetType ---
    const result = data.filter((cardSet: MtgSetTreeViewmodel) => {
      return (filterProps.cardSetFilterValue ? cardSet.cardSetName.toUpperCase().indexOf(filterProps.cardSetFilterValue.toUpperCase()) >= 0 : true) &&
        filterProps.cardSetTypeFilter.indexOf(cardSet.cardSetType) >= 0;
    });

    // --- if group by parent then filter out those items where parent is filtered out and add those whose parent was removed ---
    if (filterProps.cardSetGroupBy == "parent") {
      // --- find all Sets that are parent of another set ---
      let parents = result
        .filter((cardSet: MtgSetTreeViewmodel) => cardSet.parentId != null)
        .map((cardSet: MtgSetTreeViewmodel) => data.find((parent: MtgSetTreeViewmodel) => parent.id == cardSet.parentId)!);
      // --- create an aray of unique parents ---
      let uniqueParents = [...new Map(parents.map((parent: MtgSetTreeViewmodel) => [parent["id"], parent])).values()];
      // --- process that array
      while (uniqueParents.length > 0) {
        result.push(...uniqueParents);
        parents = parents
          .filter((cardSet: MtgSetTreeViewmodel) => cardSet.parentId != null)
          .map((cardSet: MtgSetTreeViewmodel) => data.find((parent: MtgSetTreeViewmodel) => parent.id == cardSet.parentId)!);
        uniqueParents = [...new Map(parents.map((parent: MtgSetTreeViewmodel) => [parent["id"], parent])).values()];
      }
      const uniqueResult = [...new Map(result.map((r: MtgSetTreeViewmodel) => [r["id"], r])).values()];
      return uniqueResult;
    } else {
      return result;
    }
  }

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
    }
    void serviceContainer.collectionManagerProxy.postData("/admin/synchronization/partial",postData)
      // .then()
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      <HeaderView
        cardSetSort={state.cardSetSort}
        cardSetGroupBy={state.cardSetGroupBy}
        cardSetTypeFilter={state.cardSetTypeFilter}
        className={props.className}
        onCardSetGroupByChanged={onCardSetGroupByChanged}
        onCardSetSortChanged={onCardSetSortChanged}
        onCardSetTypeFilterChanged={onCardSetTypeFilterChanged}
        onTextFilterChanged={onTextFilterChanged}
      />
      <Treeview
        buildTree={buildTree}
        data={props.cardSets}
        filterProps={{ filter: state, applyFilterProps: applyFilterProps }}
        onDataSelected={(sets: Array<MtgSetTreeViewmodel>) => props.onSetsSelected(sets)}
      />
    </>
  );
  // #endregion

  // #region Auxiliary Methods: build tree ------------------------------------
  function buildTree(data: Array<MtgSetTreeViewmodel>, props?: MtgSetTreeConfigurationViewmodel): Array<TreeNodeInfo<MtgSetTreeViewmodel | string>> {
    let result: Array<TreeNodeInfo<MtgSetTreeViewmodel>>;
    switch (props?.cardSetGroupBy || "parent") {
      case "parent":
        result = buildTreeByParent(data);
        break;
      case "block":
        result = buildTreeByBlockOrType(data, (cardSet: MtgSetTreeViewmodel) => cardSet.block || "none");
        break;
      case "none":
        result = buildTreeByNone(data);
        break;
      case "setType":
        result = buildTreeByBlockOrType(data, (cardSet: MtgSetTreeViewmodel) => cardSet.cardSetType);
        break;
    }
    return result;
  }

  function buildTreeByParent(cardSets: Array<MtgSetTreeViewmodel>): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
    return buildTreeByParentRecursive(cardSets, null);
  }

  function buildTreeByParentRecursive(cardSets: Array<MtgSetTreeViewmodel>, id: number | null): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
    return cardSets
      .filter((item: MtgSetTreeViewmodel) => item.parentId === id)
      .sort(sortViewmodelfunction)
      .map((cardSet: MtgSetTreeViewmodel) => {
        const childNodes: Array<TreeNodeInfo<MtgSetTreeViewmodel>> = buildTreeByParentRecursive(cardSets, cardSet.id);
        const node = mapViewModelToTreeItem(cardSet);
        node.childNodes = childNodes.length > 0 ? childNodes : undefined;
        return node;
      });
  }

  function buildTreeByBlockOrType(cardSets: Array<MtgSetTreeViewmodel>, groupFieldFunction: (cardSet: MtgSetTreeViewmodel) => string): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
    const groups = [...new Set(cardSets.map((cardSet: MtgSetTreeViewmodel) => groupFieldFunction(cardSet)))];
    groups.sort((a: string, b: string) => (a ?? "zzz").toUpperCase().localeCompare((b ?? "zzz").toUpperCase()));

    return groups.map((group: string) => {
      const childNodes = cardSets.filter((cardSet: MtgSetTreeViewmodel) => groupFieldFunction(cardSet) == group);
      const groupNode: TreeNodeInfo<MtgSetTreeViewmodel> = {
        id: group,
        label: upperFirst(group).replace("_", " "),
        isExpanded: false,
        isSelected: false,
        nodeData: serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getGroupMtgSetTreeViewmodel(group),
        childNodes: childNodes.sort(sortViewmodelfunction).map(mapViewModelToTreeItem)
      };
      return groupNode;
    });
  }

  function buildTreeByNone(cardSets: Array<MtgSetTreeViewmodel>): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
    return cardSets
      .sort(sortViewmodelfunction)
      .map((cardSet: MtgSetTreeViewmodel) => mapViewModelToTreeItem(cardSet));
  }

  function sortViewmodelfunction(a: MtgSetTreeViewmodel, b: MtgSetTreeViewmodel): number {
    switch (state.cardSetSort) {
      case "alphabeticallyAscending":
        return a.cardSetName.localeCompare(b.cardSetName);
      case "alphabeticallyDescending":
        return -a.cardSetName.localeCompare(b.cardSetName);
      case "releaseDateAscending":
        return a.releaseDateIsoString.localeCompare(b.releaseDateIsoString);
      case "releaseDateDescending":
        return -a.releaseDateIsoString.localeCompare(b.releaseDateIsoString);
    }
  }

  /*
   * TODO this creates as much virtual targets as there are sets in the tree
   * check how to put Contextmenu on tree itself and pass set under cursor to the methods
   */
  function mapViewModelToTreeItem(cardSet: MtgSetTreeViewmodel): TreeNodeInfo<MtgSetTreeViewmodel> {
    const node: TreeNodeInfo<MtgSetTreeViewmodel> = {
      id: cardSet.id,
      label: (
        <ContextMenu
          key={`context-menu-${cardSet.id}`}
          className="tree-view-item"
          content={
            (
              <Menu key={`menu-${cardSet.id}`}>
                <MenuItem
                  key={`sync-${cardSet.id}`}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      synchronizeSet(cardSet.code);
                    }
                  }
                  text="Synchronize cards"
                />
                <MenuItem
                  key={`prop-${cardSet.id}`}
                  onClick={
                    (e) => {
                      e.preventDefault();
                      // setSelectedCardSetForDialog(cardSet);
                    }
                  }
                  text="Properties"
                />
              </Menu>
            )
          }
        >
          <i
            key={`icon-${cardSet.id}`}
            className={classNames("tree-view-image", "ss", "ss-" + cardSet.keyRuneCode.toLowerCase())}
          >
          </i>
          {cardSet.treeItemLabel}
        </ContextMenu>
      ),
      isExpanded: cardSet.isExpanded,
      isSelected: cardSet.isSelected,
      nodeData: cardSet
    };
    return node;
  }
  // #endregion
}
