import { Icon } from "@blueprintjs/core";
import { SystemSettingsDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { SystemSettingsDialogBody } from "../system-settings-dialog/system-settings-dialog-body";
import { SystemSettingsDialogFooter } from "../system-settings-dialog/system-settings-dialog-footer";

export function showSystemSettingsDialog(serviceContainer: IServiceContainer): void {
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
      .getSystemSettingsViewmodel(serviceContainer.configurationService.configuration.systemConfiguration),
    bodyRenderer: (bodyProps: BaseDialogBodyProps<SystemSettingsDto>) => {
      return (<SystemSettingsDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<SystemSettingsDto>) => {
      return (<SystemSettingsDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(uiSettingsProps);
}
