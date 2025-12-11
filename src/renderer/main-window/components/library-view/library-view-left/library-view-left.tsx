import { Tab, Tabs } from "@blueprintjs/core";
import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { CardSearchView } from "../../../../shared/components/card-search-view/card-search-view";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { MtgSetTreeDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion#

  // #region memo -------------------------------------------------------------
  const cardSets = React.useMemo(
    () => {
      return serviceContainer.mtgSetService.allSets.map((set: MtgSetTreeDto) => serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetTreeViewmodel(set));
    },
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <Tabs
        animate={true}
        className="left-panel-tabs"
        defaultSelectedTabId="set-tree-view"
        renderActiveTabPanelOnly={true}
      >
        <Tab
          className="left-panel-tab-panel"
          id="set-tree-view"
          key="set-tree-view"
          panel={
            (
              <SetTreeView
                {...props}
                cardSets={cardSets}
                configuration={new MtgSetTreeConfigurationViewmodel(serviceContainer.configurationService.rendererConfiguration.mtgSetTreeViewConfiguration)}
                onSetsSelected={props.onSetSelectionChanged}
              />
            )
          }
          title="Sets"
        />
        <Tab
          className="left-panel-tab-panel"
          id="advanced-search"
          key="advanced-search"
          panel={
            (
              <CardSearchView
                initialCardSearchDto={props.initialCardSearchDto}
                onSearch={props.onAdvancedSearch}
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
