import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import { SystemSettingsDialogBody } from "../system-settings-dialog/system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "../system-settings-dialog/system-settings-dialog-footer";
import { SystemSettingsDialogBodyProps, SystemSettingsDialogFooterProps, SystemSettingsDialogProps } from "../system-settings-dialog/system-settings-dialog.props";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer, firstTime: boolean): void {
  void serviceContainer.viewmodelFactoryService.settingsViewmodelFactory
    .getSystemSettingsViewmodel(serviceContainer.ipcProxy, firstTime)
    .then(
      (viewmodel: SystemSettingsViewmodel) => {
        const uiSettingsProps: SystemSettingsDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "System Settings",
          icon: (<Icon icon="warning-sign" intent="danger" />),
          viewmodel: viewmodel,
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
