import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { SystemSettingsDto } from "../../../../../common/dto";
import { LogSetting } from "../../../../../common/types";
import { useServices } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { SystemSettingsDialogFooterProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogFooter(props: SystemSettingsDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SystemSettingsDto): Promise<void> {
    const toSave: SystemSettingsDto = {
      discovery: dto.discovery,
      dataConfiguration: props.viewmodel.dataConfigurationViewmodel.dto,
      loggingConfiguration: new Array<LogSetting>(
        props.viewmodel.getLogSettingsViewmodel("API").dto,
        props.viewmodel.getLogSettingsViewmodel("DB").dto,
        props.viewmodel.getLogSettingsViewmodel("Main").dto,
        props.viewmodel.getLogSettingsViewmodel("Renderer").dto,
      )
    };
    return serviceContainer.configurationService.saveSystemSettings(toSave)
      .then(
        (_r: SystemSettingsDto) => {
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

  function factoryDefaultClick() {
    void serviceContainer.configurationService.getSystemSettingsFactoryDefaults()
      .then(
        (dto: SystemSettingsDto) => {
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
