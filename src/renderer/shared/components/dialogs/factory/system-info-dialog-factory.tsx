import { Icon } from "@blueprintjs/core";
import { IServiceContainer } from "../../../context";
import { SystemInfoDialogBody } from "../system-info-dialog/system-info-dialog-body";
import { SystemInfoDialogFooter } from "../system-info-dialog/system-info-dialog-footer";
import { SystemInfoDialogBodyProps, SystemInfoDialogFooterProps, SystemInfoDialogProps } from "../system-info-dialog/system-info-dialog.props";

export function showSystemInfoDialog(serviceContainer: IServiceContainer) {
  const statusProps: SystemInfoDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    title: "System Status",
    icon: (<Icon icon="info-sign" intent="primary" />),
    viewmodel: serviceContainer
      .viewmodelFactoryService
      .settingsViewmodelFactory
      .getSystemInfoViewmodel(serviceContainer),
    bodyRenderer: (bodyProps: SystemInfoDialogBodyProps) => {
      return (<SystemInfoDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: SystemInfoDialogFooterProps) => {
      return (<SystemInfoDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialog(statusProps);
}
