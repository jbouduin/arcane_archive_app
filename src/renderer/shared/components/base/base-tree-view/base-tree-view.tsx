import "./base-tree.css";

import { Tree, TreeNodeInfo } from "@blueprintjs/core";
import { useCallback, useEffect, useReducer } from "react";
import { IBaseTreeNodeViewmodel } from "./base-tree-node.viewmodel";
import { BaseTreeViewProps } from "./base-tree-view.props";
import { BaseTreeViewReducer } from "./base-tree-view.reducer";
import { BaseTreeViewAction, NodePath } from "./types";

// BUG after adding or modifying everything collapses and nothing is selected anymore
export function BaseTreeView<TData extends IBaseTreeNodeViewmodel, TFilter>(
  props: BaseTreeViewProps<TData, TFilter>
): JSX.Element {
  //#region State -------------------------------------------------------------
  const [nodes, dispatch] = useReducer(
    BaseTreeViewReducer as React.Reducer<Array<TreeNodeInfo<TData>>, BaseTreeViewAction>,
    undefined,
    () => []);
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      const nodes = props.filterProps
        ? props.buildTree(
          props.filterProps.applyFilterProps(props.data, props.filterProps.filter), props.filterProps.filter
        )
        : props.buildTree(props.data, undefined);
      dispatch({
        type: "FILTER",
        payload: nodes
      });
    },
    [props.filterProps, props.data]
  );
  //#endregion

  //#region event handlers ----------------------------------------------------
  const handleNodeClick = useCallback(
    (node: TreeNodeInfo<TData>, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
      // add e.metaKey, because stupidity never dies...
      const isCtrl = e.ctrlKey || e.metaKey;
      const originallySelected = node.isSelected || false;

      if (!isCtrl) {
        dispatch({ type: "DESELECT_ALL" });
      }
      dispatch({
        payload: { path: nodePath, isSelected: !originallySelected },
        type: "SET_IS_SELECTED"
      });
      props.dataSelectionChanged(node.nodeData!, !originallySelected, !isCtrl);
    },
    []
  );

  const handleNodeCollapse = useCallback(
    (node: TreeNodeInfo<TData>, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: false },
        type: "SET_IS_EXPANDED"
      });
      props.nodeExpandedChanged(node, false);
    },
    []
  );

  const handleNodeExpand = useCallback(
    (node: TreeNodeInfo<TData>, nodePath: NodePath) => {
      dispatch({
        payload: { path: nodePath, isExpanded: true },
        type: "SET_IS_EXPANDED"
      });
      props.nodeExpandedChanged(node, true);
    },
    []
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <Tree
      className="aa-base-tree"
      compact={true}
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
    />
  );
  //#endregion
}
