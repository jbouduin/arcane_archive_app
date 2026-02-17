import { Tree, TreeNodeInfo } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { AaTreeAction, NodePath } from "./types";

export function AaTreeReducer<TData>(
  state: Array<TreeNodeInfo<TData>> = [],
  action: AaTreeAction): Array<TreeNodeInfo<TData>> {
  const newState = cloneDeep(state);
  switch (action.type) {
    case "DESELECT_ALL": {
      forEachNode(
        newState,
        (node: TreeNodeInfo<TData>) => {
          node.isSelected = false;
        }
      );
      return newState;
    }
    case "SET_IS_EXPANDED": {
      forNodeAtPath(
        newState,
        action.payload.path,
        (node: TreeNodeInfo<TData>) => {
          node.isExpanded = action.payload.isExpanded;
        }
      );
    }
      return newState;
    case "SET_IS_SELECTED": {
      forNodeAtPath(
        newState,
        action.payload.path,
        (node: TreeNodeInfo<TData>) => {
          node.isSelected = action.payload.isSelected;
        }
      );
      return newState;
    }
    case "FILTER":
      return action.payload as Array<TreeNodeInfo<TData>>;
    default:
      return state;
  }
}

function forEachNode<TData>(
  nodes: Array<TreeNodeInfo<TData>> | undefined,
  callback: (node: TreeNodeInfo<TData>) => void
): void {
  if (!nodes) {
    return;
  }
  for (const node of nodes) {
    callback(node);
    forEachNode(node.childNodes, callback);
  }
}

function forNodeAtPath<TData>(
  nodes: Array<TreeNodeInfo<TData>>,
  path: NodePath,
  callback: (node: TreeNodeInfo<TData>) => void
): void {
  callback(Tree.nodeFromPath(path, nodes));
}

export function getTreeNodeItemsRecursive<TData>(
  node: TreeNodeInfo<TData>,
  items?: Array<TData>
): Array<TData> {
  const result = items ?? new Array<TData>();
  result.push(node.nodeData!);
  node.childNodes?.forEach((child: TreeNodeInfo<TData>) => getTreeNodeItemsRecursive(child, result));
  return result;
}
