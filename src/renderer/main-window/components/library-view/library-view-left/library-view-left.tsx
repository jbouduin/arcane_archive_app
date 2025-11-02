import { useServices } from "../../../../hooks/use-services";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { MtgSetDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel, MtgSetTreeViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion#

  // #region Rendering --------------------------------------------------------
  return (
    <div>
      <SetTreeView
        {...props}
        cardSets={serviceContainer.mtgSetService.allSets.map((set: MtgSetDto) => serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetTreeViewmodel(set))}
        configuration={new MtgSetTreeConfigurationViewmodel(serviceContainer.configurationService.rendererConfiguration.mtgSetTreeViewConfiguration)}
        onSetsSelected={(sets: Array<MtgSetTreeViewmodel>) => props.onSetsSelected(sets)}
      />
    </div>
  );
  // #endregion
}
