import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { SystemSettingsDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { SystemSettingsDialogBody } from "../system-settings-dialog/system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "../system-settings-dialog/system-settings-dialog-footer";
import { IpcPaths } from "../../../../../common/ipc";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer): void {
  serviceContainer.ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS)
    .then(
      (configuration: SystemSettingsDto) => {
        const uiSettingsProps: BaseDialogProps<SystemSettingsDto> = {
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
          bodyRenderer: (bodyProps: BaseDialogBodyProps<SystemSettingsDto>) => {
            return (<SystemSettingsDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: BaseDialogFooterProps<SystemSettingsDto>) => {
            return (<SystemSettingsDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.dialogService.openDialog(uiSettingsProps);
      },
      noop
    );
}
