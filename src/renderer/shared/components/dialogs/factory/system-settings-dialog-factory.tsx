import { Icon } from "@blueprintjs/core";
import { IServiceContainer } from "../../../context";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { SystemSettingsDialogBody } from "../system-settings-dialog/system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "../system-settings-dialog/system-settings-dialog-footer";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer): void {
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  const uiSettingsProps: BaseDialogProps<String> = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "System Settings",
    icon: (<Icon icon="warning-sign" intent="danger" />),
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getSystemSettingsViewmodel(new String("System settings")),
    // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
    bodyRenderer: (bodyProps: BaseDialogBodyProps<String>) => {
      return (<SystemSettingsDialogBody {...bodyProps} />);
    },
    // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
    footerRenderer: (footerProps: BaseDialogFooterProps<String>) => {
      return (<SystemSettingsDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(uiSettingsProps);
}
