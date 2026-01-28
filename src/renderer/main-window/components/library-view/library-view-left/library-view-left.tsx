import { Tab, Tabs } from "@blueprintjs/core";
import { noop } from "lodash";
import { useMemo } from "react";
import { usePreferences } from "../../../../hooks";
import { useServices } from "../../../../hooks/use-services";
import { AdvancedCardSearchView } from "../../../../shared/components/advanced-card-search-view/advanced-card-search-view";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { AdvancedCardSearchDto, CardFilterParamsDto, CollectionDto, MtgSetTreeDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { mtgSetService, viewmodelFactoryService } = useServices();
  const { preferences } = usePreferences();
  // #endregion#

  // #region memo -------------------------------------------------------------
  const cardSets = useMemo(
    () => {
      return mtgSetService.allSets.map(
        (set: MtgSetTreeDto) => viewmodelFactoryService.mtgSetViewmodelFactory
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
                cardSets={cardSets}
                configuration={new MtgSetTreeConfigurationViewmodel(preferences.librarySetTreeSettings)}
                onSetsSelected={(sets: Array<MtgSetTreeDto>) => props.setSelectionChanged(sets, true)}
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
                advancedCardSearch={{
                  cardFilterParams: props.cardFilterParams,
                  cardSetFilter: props.cardSetFilter,
                  collectionFilter: new Array<CollectionDto>()
                }}
                cardSetsChanged={(sets: Array<MtgSetTreeDto>) => props.setSelectionChanged(sets, false)}
                cardFilterParamsChanged={(filter: CardFilterParamsDto) => props.cardFilterParamsChanged(filter)}
                collectionsChanged={noop}
                search={
                  (cardSearch: AdvancedCardSearchDto) =>
                    props.search(cardSearch.cardSetFilter, cardSearch.cardFilterParams)
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
