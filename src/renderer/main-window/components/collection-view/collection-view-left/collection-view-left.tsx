import { Tab, Tabs } from "@blueprintjs/core";
import { AdvancedCardSearchView } from "../../../../shared/components/advanced-card-search-view/advanced-card-search-view";
import { AdvancedCardSearchDto, CardFilterParamsDto, CollectionDto } from "../../../../shared/dto";
import { CollectionTreeView } from "./collection-tree-view";
import { CollectionViewLeftProps } from "./collection-view-left.props";

export function CollectionViewLeft(props: CollectionViewLeftProps): JSX.Element {
  // #region memo -------------------------------------------------------------
  /*
   * const cardSets = useMemo(
   * () => {
   *   return mtgSetService.allSets.map(
   *     (set: MtgSetTreeDto) => viewmodelFactoryService.mtgSetViewmodelFactory
   *       .getMtgSetTreeViewmodel(set)
   *   );
   * },
   * []
   * );
   */
  // #endregion

  // #region Rendering --------------------------------------------------------
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
              collectionSelected={
                (selectedData: Array<CollectionDto>, execute: boolean) =>
                  props.collectionSelectionChanged(selectedData, execute)
              }
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
              <AdvancedCardSearchView
                advancedCardSearch={{
                  cardFilterParams: props.cardFilterParams,
                  cardSetFilter: props.cardSetFilter,
                  collectionFilter: new Array<CollectionDto>()
                }}
                cardSetsChanged={props.setSelectionChanged}
                cardFilterParamsChanged={(filter: CardFilterParamsDto) => props.cardFilterParamsChanged(filter)}
                collectionsChanged={(selectedData: Array<CollectionDto>) =>
                  props.collectionSelectionChanged(selectedData, false)}
                search={
                  (cardSearch: AdvancedCardSearchDto) =>
                    props.search(cardSearch.collectionFilter, cardSearch.cardSetFilter, cardSearch.cardFilterParams)
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
