import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { SetTreeView } from "../../../../shared/components/set-tree-view/set-tree-view";
import { MtgSetDto } from "../../../../shared/dto";
import { MtgSetTreeConfigurationViewmodel } from "../../../../shared/viewmodel";
import { LibraryViewLeftProps } from "./library-view-left.props";

export function LibraryViewLeft(props: LibraryViewLeftProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion#

  // #region memo -------------------------------------------------------------
  const cardSets = React.useMemo(
    () => {
      return serviceContainer.mtgSetService.allSets.map((set: MtgSetDto) => serviceContainer.viewmodelFactoryService.mtgSetViewmodelFactory.getMtgSetTreeViewmodel(set));
    },
    []
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="mosaic-tile-content-wrapper">
      <SetTreeView
        {...props}
        cardSets={cardSets}
        configuration={new MtgSetTreeConfigurationViewmodel(serviceContainer.configurationService.rendererConfiguration.mtgSetTreeViewConfiguration)}
        onSetsSelected={props.onSelectionChanged}
      />
    </div>
  );
  // #endregion
}
