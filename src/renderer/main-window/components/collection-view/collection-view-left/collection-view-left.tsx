import { Tab, Tabs } from "@blueprintjs/core";
import { AdvancedCardSearch } from "../../../../shared/components/advanced-card-search";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { CollectionTreeView } from "./collection-tree-view";
import { CollectionViewLeftProps } from "./collection-view-left.props";

export function CollectionViewLeft(props: CollectionViewLeftProps): JSX.Element {
  //#region Rendering ---------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <Tabs
        animate={true}
        className="left-panel-tabs"
        renderActiveTabPanelOnly={true}
        selectedTabId={props.currentSelectedSearchTab}
        onChange={props.selectedSearchTabChanged}
      >
        <Tab
          className="left-panel-tab-panel"
          id={0}
          key="collection-tree-view"
          panel={(
            <CollectionTreeView
              expandedNodes={props.expandedNodes}
              viewmodel={props.viewmodel}
              expandedNodesChanged={props.expandedNodesChanged}
              viewmodelChanged={props.viewmodelChanged}
              search={(dto: CardQueryFilterDto) => props.search(dto, true)}
            />
          )}
          title="Collections"
        />
        <Tab
          className="left-panel-tab-panel"
          id={1}
          key="advanced-search"
          panel={
            (
              <AdvancedCardSearch
                viewmodel={props.viewmodel}
                viewmodelChanged={props.viewmodelChanged}
                search={(dto: CardQueryFilterDto) => props.search(dto, false)}
              />
            )
          }
          title="Advanced Search"
        />
      </Tabs>
    </div>
  );
  // #endregion
}
