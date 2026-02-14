import { Tab, Tabs } from "@blueprintjs/core";
import { usePreferences } from "../../../../hooks";
import { AdvancedCardSearch } from "../../../../shared/components/advanced-card-search";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { CardQueryFilterDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { preferences } = usePreferences();
  // #endregion#

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
                configuration={new MtgSetTreeConfigurationViewmodel(preferences.librarySetTreeSettings)}
                search={(dto: CardQueryFilterDto) => props.search(dto, true)}
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
