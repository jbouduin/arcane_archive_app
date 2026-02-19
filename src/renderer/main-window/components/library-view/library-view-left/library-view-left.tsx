import { Tab, Tabs } from "@blueprintjs/core";
import { AdvancedCardSearch } from "../../../../shared/components/advanced-card-search";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <Tabs
        animate={true}
        className="left-panel-tabs"
        selectedTabId={props.currentSelectedSearchTab}
        renderActiveTabPanelOnly={true}
        onChange={props.selectedSearchTabChanged}
      >
        <Tab
          className="left-panel-tab-panel"
          id={0}
          key="set-tree-view"
          panel={
            (
              <SetTreeView
                {...props}
                viewmodel={props.viewmodel}
                viewmodelChanged={props.viewmodelChanged}
                configuration={props.treeConfiguration}
                /**
                 * # BUG page should be reset to page 0, probably in advancecardsearch also
                 * and the page size gets lost when selecting another set in the tree
                 */
                search={(dto: CardQueryFilterDto) => props.search(dto, true)}
                treeConfigurationChanged={props.treeConfigurationChanged}
              />
            )
          }
          title="Sets"
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
