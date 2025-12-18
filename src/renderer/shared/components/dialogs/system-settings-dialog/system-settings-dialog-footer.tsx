import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { SystemSettingsDto } from "../../../../../common/dto";
import { useServices } from "../../../../hooks";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { SystemSettingsDialogFooterProps } from "./system-settings-dialog-props";

export function SystemSettingsDialogFooter(props: SystemSettingsDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SystemSettingsDto): Promise<void> {
    return serviceContainer.configurationService.saveSystemSettings(dto)
      .then(
        (_r: SystemSettingsDto) => serviceContainer.configurationService.restart(),
        noop
      );
  }

  function factoryDefaultClick() {
    void serviceContainer.configurationService.getSystemSettingsFactoryDefaults()
      .then(
        (dto: SystemSettingsDto) => {
          Object.assign(props.viewmodel.dto, dto);
          props.viewmodelChanged(props.viewmodel);
        },
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<SystemSettingsDto, SystemSettingsViewmodel>
      {...props}
      commitButtonLabel="Save and Restart"
      showResetButton={true}
      additionalLeftButtons={additionalLeftButtons()}
      onCommitButtonClick={saveClick}
    />
  );

  function additionalLeftButtons(): ReactNode {
    return (
      <Button
        key="factory-default"
        icon="wrench-redo"
        onClick={factoryDefaultClick}
      >
        Factory Defaults
      </Button>
    );
  }
  // #endregion
}
