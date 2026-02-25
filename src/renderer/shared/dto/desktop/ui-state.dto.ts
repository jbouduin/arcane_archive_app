export type UiStateDto = {
  /**
   * Stores the expanded nodes in the tree
   */
  expandedNodes: Array<string | number>;
  /**
   * Will be used to store the selected nodes in the tree.
   * Currently not used.
   */
  selectedNodes: Array<string | number>;
  /**
   * The version of the card table, this property is used as on of the cellRendererDependencies in the table.
   */
  tableVersion: number;
};
