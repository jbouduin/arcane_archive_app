import { Icon } from "@blueprintjs/core";
import { noop } from "lodash";
import { IServiceContainer } from "../../../context";
import { SystemSettingsViewmodel } from "../../../viewmodel";
import * as SystemSettings from "../system-settings-dialog";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer, firstTime: boolean): void {
  void serviceContainer.viewmodelFactoryService.settingsViewmodelFactory
    .getSystemSettingsViewmodel(serviceContainer.ipcProxy, firstTime)
    .then(
      (viewmodel: SystemSettingsViewmodel) => {
        const uiSettingsProps: SystemSettings.SystemSettingsDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "System Settings",
          icon: (<Icon icon="warning-sign" intent="danger" />),
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: SystemSettings.SystemSettingsDialogBodyProps) => {
            return (<SystemSettings.SystemSettingsDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: SystemSettings.SystemSettingsDialogFooterProps) => {
            return (<SystemSettings.SystemSettingsDialogFooter {...footerProps} />);
          }
        };
        serviceContainer.overlayService.openDialogNew(uiSettingsProps);
      },
      noop
    );
}
