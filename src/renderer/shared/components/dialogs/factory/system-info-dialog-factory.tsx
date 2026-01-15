import { Icon } from "@blueprintjs/core";
import { IServiceContainer } from "../../../context";
import * as SystemInfo from "../system-info-dialog";

export function showSystemInfoDialog(serviceContainer: IServiceContainer) {
  const statusProps: SystemInfo.SystemInfoDialogProps = {
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
    bodyRenderer: (bodyProps: SystemInfo.SystemInfoDialogBodyProps) => {
      return (<SystemInfo.SystemInfoDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: SystemInfo.SystemInfoDialogFooterProps) => {
      return (<SystemInfo.SystemInfoDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialogNew(statusProps);
}
