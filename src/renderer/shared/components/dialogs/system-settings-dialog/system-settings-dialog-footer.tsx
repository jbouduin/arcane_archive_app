import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { SystemConfigurationDto } from "../../../../../common/dto";
import { useServices } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { SystemSettingsDialogFooterProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogFooter(props: SystemSettingsDialogFooterProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SystemConfigurationDto): Promise<void> {

    return serviceContainer.configurationService.saveSystemSettings(dto)
      .then(
        (_r: SystemConfigurationDto) => {
          if (props.onClose) {
            props.onClose(event);
          }
          if (props.viewmodel.restartRequired) {
            serviceContainer.configurationService.restart();
          }
        },
        noop
      );
  }

  function factoryDefaultClick(): void {
    void serviceContainer.configurationService.getSystemSettingsFactoryDefaults()
      .then(
        (dto: SystemConfigurationDto) => {
          props.viewmodel.setFactoryDefaults(dto);
          props.viewmodelChanged();
        },
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <DefaultDialogFooter
      {...props}
      commitButtonLabel={props.viewmodel.restartRequired ? "Save and Restart" : "Save"}
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
