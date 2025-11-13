import { useServices } from "../../../../hooks/use-services";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { MtgSetDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel, MtgSetTreeViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion#

  // #region Event handling ---------------------------------------------------
  function onSelectedSetsChanged(sets: Array<MtgSetTreeViewmodel>) {
    props.onSelectionChanged({
      selectedSets: sets.map((set: MtgSetTreeViewmodel) => set.id),
      pageNumber: 0,
      // LATER this will reset following fields every time
      pageSize: 100,
      sortField: "collectorNumberSortValue",
      sortDirection: "ASC"
    });
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <SetTreeView
        {...props}
        cardSets={serviceContainer.mtgSetService.allSets.map((set: MtgSetDto) => serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetTreeViewmodel(set))}
        configuration={new MtgSetTreeConfigurationViewmodel(serviceContainer.configurationService.rendererConfiguration.mtgSetTreeViewConfiguration)}
        onSetsSelected={(sets: Array<MtgSetTreeViewmodel>) => onSelectedSetsChanged(sets)}
      />
    </div>
  );
  // #endregion
}
