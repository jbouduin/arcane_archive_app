import { Button } from "@blueprintjs/core";
import { noop } from "lodash";
import { ReactNode } from "react";
import { SystemSettingsDto } from "../../../../../common/dto";
import { useServices } from "../../../../hooks";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { SystemSettingsDialogFooterProps } from "./system-settings-dialog-props";
import { SystemSettingsViewmodel } from "../../../viewmodel";

export function SystemSettingsDialogFooter(props: SystemSettingsDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, dto: SystemSettingsDto): Promise<void> {
    return serviceContainer.configurationService.saveSystemSettings(dto)
      .then(
        (_r: SystemSettingsDto) => {
          // TODO user should restart completely or reboot main.
          // As reboot main is not implemented -> restart
          // warning should be given
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }

  function factoryDefaultClick() {
    serviceContainer.ipcProxy.getData<SystemSettingsDto>("/configuration/factory-default")
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
