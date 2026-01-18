import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { SystemConfigurationDto } from "../../../../../common/dto";
import { MainLogSetting, ResponseLogSetting } from "../../../../../common/types";
import { useServices } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { SystemSettingsDialogFooterProps } from "./system-settings-dialog.props";

export function SystemSettingsDialogFooter(props: SystemSettingsDialogFooterProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SystemConfigurationDto): Promise<void> {
    const toSave: SystemConfigurationDto = {
      discovery: dto.discovery,
      dataConfiguration: props.viewmodel.dataConfigurationViewmodel.dto,
      mainLoggingConfiguration: new Array<MainLogSetting>(
        props.viewmodel.getMainLogSettingsViewmodel("API").dto,
        props.viewmodel.getMainLogSettingsViewmodel("DB").dto,
        props.viewmodel.getMainLogSettingsViewmodel("Main").dto,
        props.viewmodel.getMainLogSettingsViewmodel("Renderer").dto,
      ),
      rendererLogLevel: props.viewmodel.dto["rendererLogLevel"],
      responseLoggingConfiguration: new Array<ResponseLogSetting>(
        props.viewmodel.getResponseLogSettingsViewmodel("IPC").dto,
        props.viewmodel.getResponseLogSettingsViewmodel("authentication").dto,
        props.viewmodel.getResponseLogSettingsViewmodel("collection").dto,
        props.viewmodel.getResponseLogSettingsViewmodel("deck").dto,
        props.viewmodel.getResponseLogSettingsViewmodel("library").dto,
      )
    };
    return serviceContainer.configurationService.saveSystemSettings(toSave)
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
