import { Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { AdvancedCardSearch } from "../../../../shared/components/advanced-card-search";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps): JSX.Element {
  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <Tabs
        animate={true}
        className="left-panel-tabs"
        selectedTabId={props.viewmodel.dto.selectedSearchTab}
        renderActiveTabPanelOnly={true}
        onChange={(newSelectedSearchTab: string | number) => {
          props.viewmodel.dto.selectedSearchTab = newSelectedSearchTab;
          props.viewmodelChanged();
        }}
      >
        <Tab
          className="left-panel-tab-panel"
          id={0}
          key="set-tree-view"
          panel={
            (
              <SetTreeView
                {...props}
                viewmodel={props.viewmodel.queryFilterViewmodel}
                viewmodelChanged={() => {
                  props.viewmodel.queryParamsViewmodel.dto.pageNumber = 0;
                  props.viewmodel
                    .search()
                    .then(
                      () => props.viewmodelChanged(),
                      noop
                    );
                }}
                configuration={props.viewmodel.treeConfiguration}
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
                viewmodel={props.viewmodel.queryFilterViewmodel}
                search={() => {
                  props.viewmodel.queryParamsViewmodel.dto.pageNumber = 0;
                  props.viewmodel
                    .search()
                    .then(
                      () => props.viewmodelChanged(),
                      noop
                    );
                }}
                viewmodelChanged={props.viewmodelChanged}
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
