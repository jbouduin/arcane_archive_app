import { TreeNodeInfo } from "@blueprintjs/core";
import { IBaseTreeNodeViewmodel } from "./base-tree-node.viewmodel";
import { BaseTreeViewFilterProps } from "./base-tree-view-filter.props";

export interface BaseTreeViewProps<TData extends IBaseTreeNodeViewmodel, TFilter> {
  data: Array<TData>;
  filterProps: BaseTreeViewFilterProps<TData, TFilter>;

  buildTree: (data: Array<TData>, filterProps?: TFilter) => Array<TreeNodeInfo<TData | string>>;
  dataSelectionChanged: (selectedData: TData, selected: boolean, clearOthers: boolean) => void;
  nodeExpandedChanged: (node: TreeNodeInfo<TData>, selected: boolean) => void;
}
