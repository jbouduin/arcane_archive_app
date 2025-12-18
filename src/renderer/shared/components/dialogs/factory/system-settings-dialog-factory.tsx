import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { SystemSettingsDto } from "../../../../../common/dto";
import { IpcPaths } from "../../../../../common/ipc";
import { IServiceContainer } from "../../../context";
import { SystemSettingsDialogBody } from "../system-settings-dialog/system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "../system-settings-dialog/system-settings-dialog-footer";
import { SystemSettingsDialogBodyProps, SystemSettingsDialogFooterProps, SystemSettingsDialogProps } from "../system-settings-dialog/system-settings-dialog-props";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer): void {
  serviceContainer.ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS)
    .then(
      (configuration: SystemSettingsDto) => {
        const uiSettingsProps: SystemSettingsDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "System Settings",
          icon: (<Icon icon="warning-sign" intent="danger" />),
          viewmodel: serviceContainer
            .viewmodelFactoryService
            .settingsViewmodelFactory
            .getSystemSettingsViewmodel(configuration),
          bodyRenderer: (bodyProps: SystemSettingsDialogBodyProps) => {
            return (<SystemSettingsDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: SystemSettingsDialogFooterProps) => {
            return (<SystemSettingsDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialog(uiSettingsProps);
      },
      noop
    );
}
