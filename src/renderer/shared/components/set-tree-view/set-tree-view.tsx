import { TreeNodeInfo } from "@blueprintjs/core";
import { upperFirst } from "lodash";
import { CardSetGroupBy, CardSetSort } from "../../../../common/types";
import { useServices } from "../../../hooks";
import { MtgSetTreeDto } from "../../dto";
import { SelectOption } from "../../types";
import { MtgSetTreeConfigurationViewmodel, MtgSetTreeViewmodel } from "../../viewmodel";
import { AaTree } from "../base/aa-tree";
import { CardSetIcon } from "../card-set-icon";
import { HeaderView } from "./header-view";
import { SetTreeContextMenu } from "./set-tree-context-menu";
import { SetTreeViewProps } from "./set-tree-view.props";

export function SetTreeView(props: SetTreeViewProps): JSX.Element {
  //#region Hooks -------------------------------------------------------------
  const { viewmodelFactoryService } = useServices();
  //#endregion

  //#region initialization ----------------------------------------------------
  const sets = props.viewmodel
    .getSelectOptions<MtgSetTreeDto>("cardSetIds")
    .map((value: SelectOption<MtgSetTreeDto>) =>
      viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetTreeViewmodel(value.value)
    );
  //#endregion

  //#region Event Handling ----------------------------------------------------
  function onTextFilterChanged(textFilterValue: string): void {
    props.configuration.cardSetFilterValue = textFilterValue;
    props.viewmodelChanged();
  };

  function onCardSetSortChanged(cardSetSort: CardSetSort): void {
    props.configuration.cardSetSort = cardSetSort;
    props.viewmodelChanged();
  };

  function onCardSetGroupByChanged(cardSetGroupBy: CardSetGroupBy): void {
    props.configuration.cardSetGroupBy = cardSetGroupBy;

    props.viewmodelChanged();
  };

  function onCardSetTypeFilterChanged(cardSetType: string): void {
    props.configuration.toggleCardSetFilterType(cardSetType);
    props.viewmodelChanged();
  };

  function applyFilterProps(
    data: Array<MtgSetTreeViewmodel>,
    filterProps: MtgSetTreeConfigurationViewmodel
  ): Array<MtgSetTreeViewmodel> {
    // --- filter Sets by textfilter value and cardSetType ---
    const result = data.filter((cardSet: MtgSetTreeViewmodel) => {
      return (
        filterProps.cardSetFilterValue
          ? cardSet.cardSetName.toUpperCase().indexOf(filterProps.cardSetFilterValue.toUpperCase()) >= 0
          : true) && filterProps.cardSetTypeFilter.has(cardSet.cardSetType);
    });

    // --- if group by parent: filter out items where parent is filtered out and add those whose parent was removed ---
    if (filterProps.cardSetGroupBy == "parent") {
      // --- find all Sets that are parent of another set ---
      let parents = result
        .filter((cardSet: MtgSetTreeViewmodel) => cardSet.parentId != null)
        .map(
          (cardSet: MtgSetTreeViewmodel) => data.find((parent: MtgSetTreeViewmodel) => parent.id == cardSet.parentId)!
        );
      // --- create an aray of unique parents ---
      let uniqueParents = [...new Map(parents.map((parent: MtgSetTreeViewmodel) => [parent["id"], parent])).values()];
      // --- process that array
      while (uniqueParents.length > 0) {
        result.push(...uniqueParents);
        parents = parents
          .filter((cardSet: MtgSetTreeViewmodel) => cardSet.parentId != null)
          .map((cardSet: MtgSetTreeViewmodel) =>
            data.find((parent: MtgSetTreeViewmodel) => parent.id == cardSet.parentId)!
          );
        uniqueParents = [...new Map(parents.map((parent: MtgSetTreeViewmodel) => [parent["id"], parent])).values()];
      }
      const uniqueResult = [...new Map(result.map((r: MtgSetTreeViewmodel) => [r["id"], r])).values()];
      return uniqueResult;
    } else {
      return result;
    }
  }
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <>
      <HeaderView
        cardSetSort={props.configuration.cardSetSort}
        cardSetGroupBy={props.configuration.cardSetGroupBy}
        cardSetTypeFilter={props.configuration.cardSetTypeFilter}
        className={props.className}
        onCardSetGroupByChanged={onCardSetGroupByChanged}
        onCardSetSortChanged={onCardSetSortChanged}
        onCardSetTypeFilterChanged={onCardSetTypeFilterChanged}
        onTextFilterChanged={onTextFilterChanged}
      />
      <AaTree<MtgSetTreeViewmodel, MtgSetTreeConfigurationViewmodel>
        buildTree={buildTree}
        data={sets}
        filterProps={{ filter: props.configuration, applyFilterProps: applyFilterProps }}
        dataSelectionChanged={
          (set: MtgSetTreeViewmodel, selected: boolean, clearOthers: boolean) => {
            if (clearOthers) {
              props.viewmodel.dto.cardSetIds.splice(0);
            }
            if (selected) {
              props.viewmodel.dto.cardSetIds.push(set.id);
            } else {
              props.viewmodel.dto.cardSetIds = props.viewmodel.dto.cardSetIds.filter((id: number) => id != set.id);
            }
            props.viewmodelChanged();
          }
        }
        nodeExpandedChanged={
          (node: TreeNodeInfo<MtgSetTreeViewmodel>, expanded: boolean) => {
            let idToUse: number | string = node.nodeData!.id;
            if (idToUse == 0) {
              idToUse = node.nodeData!.code;
            }
            if (expanded) {
              props.configuration.expandedNodeIds.add(idToUse);
            } else {
              props.configuration.expandedNodeIds.delete(idToUse);
            }
            props.viewmodelChanged();
          }
        }
      />
    </>
  );
  //#endregion

  //#region Auxiliary Methods: build tree -------------------------------------
  function buildTree(
    data: Array<MtgSetTreeViewmodel>,
    props?: MtgSetTreeConfigurationViewmodel
  ): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
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

  function buildTreeByParentRecursive(
    cardSets: Array<MtgSetTreeViewmodel>, id: number | null
  ): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
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

  function buildTreeByBlockOrType(
    cardSets: Array<MtgSetTreeViewmodel>,
    groupFieldFunction: (cardSet: MtgSetTreeViewmodel) => string
  ): Array<TreeNodeInfo<MtgSetTreeViewmodel>> {
    const groups = [...new Set(cardSets.map((cardSet: MtgSetTreeViewmodel) => groupFieldFunction(cardSet)))];
    groups.sort((a: string, b: string) => (a ?? "zzz").toUpperCase().localeCompare((b ?? "zzz").toUpperCase()));

    return groups.map((group: string) => {
      const childNodes = cardSets.filter((cardSet: MtgSetTreeViewmodel) => groupFieldFunction(cardSet) == group);
      const groupNode: TreeNodeInfo<MtgSetTreeViewmodel> = {
        id: group,
        label: upperFirst(group).replace("_", " "),
        isSelected: false,
        nodeData: viewmodelFactoryService.mtgSetViewmodelFactory.getGroupMtgSetTreeViewmodel(group),
        childNodes: childNodes.sort(sortViewmodelfunction).map(mapViewModelToTreeItem),
        isExpanded: props.configuration.expandedNodeIds.has(group)
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
    switch (props.configuration.cardSetSort) {
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
   * this creates as much virtual targets as there are sets in the tree.
   */
  function mapViewModelToTreeItem(cardSet: MtgSetTreeViewmodel): TreeNodeInfo<MtgSetTreeViewmodel> {
    const node: TreeNodeInfo<MtgSetTreeViewmodel> = {
      id: cardSet.id,
      label: (
        <SetTreeContextMenu cardSet={cardSet.dto}>
          <CardSetIcon key={`cm-${cardSet.code}`} keyruneCode={cardSet.keyRuneCode} />
          {cardSet.treeItemLabel}
        </SetTreeContextMenu>
      ),
      isExpanded: props.configuration.expandedNodeIds.has(cardSet.id ? cardSet.id : cardSet.code),
      isSelected: props.viewmodel.dto.cardSetIds.includes(cardSet.id),
      nodeData: cardSet
    };
    return node;
  }
  //#endregion
}
