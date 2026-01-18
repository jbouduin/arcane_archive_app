import { Tab, Tabs } from "@blueprintjs/core";
import { useMemo } from "react";
import { useServices } from "../../../../hooks/use-services";
import { AdvancedCardSearchView } from "../../../../shared/components/advanced-card-search-view/advanced-card-search-view";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { AdvancedCardSearchDto, CardFilterParamsDto, MtgSetTreeDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";
import { usePreferences } from "../../../../hooks";

export function LibraryViewLeft(props: LibraryViewLeftProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { preferences } = usePreferences();
  // #endregion#

  // #region memo -------------------------------------------------------------
  const cardSets = useMemo(
    () => {
      return serviceContainer.mtgSetService.allSets.map(
        (set: MtgSetTreeDto) => serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory
          .getMtgSetTreeViewmodel(set)
      );
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
        selectedTabId={props.currentSelectedSearchTab}
        renderActiveTabPanelOnly={true}
        onChange={props.onSelectedSearchTabChanged}
      >
        <Tab
          className="left-panel-tab-panel"
          id={0}
          key="set-tree-view"
          panel={
            (
              <SetTreeView
                {...props}
                cardSets={cardSets}
                configuration={new MtgSetTreeConfigurationViewmodel(preferences.librarySetTreeSettings)}
                onSetsSelected={(sets: Array<MtgSetTreeDto>) => props.onSetSelectionChanged(sets, true)}
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
              <AdvancedCardSearchView
                advancedCardSearch={{ cardFilterParams: props.cardFilterParams, cardSetFilter: props.cardSetFilter }}
                onCardSetsChanged={(sets: Array<MtgSetTreeDto>) => props.onSetSelectionChanged(sets, false)}
                onCardFilterParamsChanged={(filter: CardFilterParamsDto) => props.onCardFilterParamsChanged(filter)}
                onSearch={
                  (cardSearch: AdvancedCardSearchDto) =>
                    props.onSearch(cardSearch.cardSetFilter, cardSearch.cardFilterParams)
                }
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
