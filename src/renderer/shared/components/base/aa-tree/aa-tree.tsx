import "./aa-tree.css";

import { Tree, TreeNodeInfo } from "@blueprintjs/core";
import { useCallback, useEffect, useReducer } from "react";
import { AaTreeProps } from "./aa-tree.props";
import { AaTreeReducer } from "./aa-tree.reducer";
import { AaTreeAction, NodePath } from "./types";

export function AaTree<TData, TFilter>(
  props: AaTreeProps<TData, TFilter>
): JSX.Element {
  //#region State -------------------------------------------------------------
  const [nodes, dispatch] = useReducer(
    AaTreeReducer as React.Reducer<Array<TreeNodeInfo<TData>>, AaTreeAction>,
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
