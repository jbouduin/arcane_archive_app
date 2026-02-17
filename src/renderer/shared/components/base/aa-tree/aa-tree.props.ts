import { TreeNodeInfo } from "@blueprintjs/core";
import { AaTreeFilterProps } from "./aa-tree-filter.props";

export interface AaTreeProps<TData, TFilter> {
  data: Array<TData>;
  filterProps: AaTreeFilterProps<TData, TFilter>;

  buildTree: (data: Array<TData>, filterProps?: TFilter) => Array<TreeNodeInfo<TData>>;
  dataSelectionChanged: (selectedData: TData, selected: boolean, clearOthers: boolean) => void;
  nodeExpandedChanged: (node: TreeNodeInfo<TData>, selected: boolean) => void;
}
