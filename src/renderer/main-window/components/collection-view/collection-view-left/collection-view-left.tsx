import { Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { AdvancedCardSearch } from "../../../../shared/components/advanced-card-search";
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
        selectedTabId={props.viewmodel.dto.selectedSearchTab}
        onChange={(newSelectedSearchTab: string | number) => {
          props.viewmodel.dto.selectedSearchTab = newSelectedSearchTab;
          props.viewmodelChanged();
        }}
      >
        <Tab
          className="left-panel-tab-panel"
          id={0}
          key="collection-tree-view"
          panel={(
            <CollectionTreeView
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
