import { Tree, TreeNodeInfo } from "@blueprintjs/core";
import * as React from "react";
import { IBaseTreeNodeViewmodel } from "./base-tree-node.viewmodel";
import { BaseTreeViewProps } from "./base-tree-view.props";
import { BaseTreeViewReducer, getTreeNodeItemsRecursive } from "./base-tree-view.reducer";
import { BaseTreeViewAction, NodePath } from "./types";

export function BaseTreeView<TData extends IBaseTreeNodeViewmodel, TFilter>(props: BaseTreeViewProps<TData, TFilter>) {
  // #region State ------------------------------------------------------------
  const [nodes, dispatch] = React.useReducer(
    BaseTreeViewReducer as React.Reducer<Array<TreeNodeInfo<TData>>, BaseTreeViewAction>,
    undefined,
    () => []);
  // #endregion

  // #region Effects ----------------------------------------------------------
  React.useEffect(
    () => {
      const nodes = props.filterProps
        ? props.buildTree(props.filterProps.applyFilterProps(props.data, props.filterProps.filter), props.filterProps.filter)
        : props.buildTree(props.data, undefined);
      dispatch({
        type: "FILTER",
        payload: nodes
      });
    },
    [props.filterProps, props.data]
  );
  // #endregion

  // #region event handlers ---------------------------------------------------
  const handleNodeClick = React.useCallback(
    (node: TreeNodeInfo<TData>, nodePath: NodePath) => {
      const originallySelected = node.isSelected;
      dispatch({ type: "DESELECT_ALL" });
      dispatch({
        payload: { path: nodePath, isSelected: originallySelected == null ? true : !originallySelected },
        type: "SET_IS_SELECTED"
      });
      props.onDataSelected(getTreeNodeItemsRecursive<TData>(node, undefined));
    },
    []
  );

  const handleNodeCollapse = React.useCallback(
    (_node: TreeNodeInfo<TData>, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: false },
        type: "SET_IS_EXPANDED"
      });
    },
    []
  );

  const handleNodeExpand = React.useCallback(
    (_node: TreeNodeInfo<TData>, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: true },
        type: "SET_IS_EXPANDED"
      });
    },
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Tree
      className="base-tree"
      compact={true}
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
    />
  );
  // #endregion
}
