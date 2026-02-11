import { Icon } from "@blueprintjs/core";
import { SystemConfigurationDto } from "../../../../../common/dto";
import { IpcPaths } from "../../../../../common/ipc";
import { IIpcProxy } from "../../../context";
import { ISettingsViewmodelFactory, SystemSettingsViewmodel } from "../../../viewmodel";
import { SystemSettingsDialogBody } from "./system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "./system-settings-dialog-footer";
import * as DialogProps from "./system-settings-dialog.props";

function getSystemSettingsDialogPropsImpl(
  firstTime: boolean,
  ipcProxy: IIpcProxy,
  settingsViewmodelFactory: ISettingsViewmodelFactory
): Promise<DialogProps.SystemSettingsDialogProps> {
  return ipcProxy.getData<SystemConfigurationDto>(IpcPaths.SYSTEM_SETTINGS)
    .then(
      (configuration: SystemConfigurationDto) => {
        const viewmodel: SystemSettingsViewmodel = settingsViewmodelFactory
          .getSystemSettingsViewmodel(configuration, firstTime);
        const uiSettingsProps: DialogProps.SystemSettingsDialogProps = {
          isOpen: true,
          isCloseButtonShown: true,
          canEscapeKeyClose: true,
          canOutsideClickClose: false,
          title: "System Settings",
          icon: (<Icon icon="warning-sign" intent="danger" />),
          viewmodel: viewmodel,
          bodyRenderer: (bodyProps: DialogProps.SystemSettingsDialogBodyProps) => {
            return (<SystemSettingsDialogBody {...bodyProps} />);
          },
          footerRenderer: (footerProps: DialogProps.SystemSettingsDialogFooterProps) => {
            return (<SystemSettingsDialogFooter {...footerProps} />);
          }
        };
        return uiSettingsProps;
      }
    );
}

export const systemSettingsDialogPropsFactory = {
  getSystemSettingsDialogProps: getSystemSettingsDialogPropsImpl
};
