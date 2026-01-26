import { Icon } from "@blueprintjs/core";
import { ApiInfoContextType, IServiceContainer } from "../../../context";
import * as SystemInfo from "../system-info-dialog";

export function showSystemInfoDialog(apiInfo: ApiInfoContextType, serviceContainer: IServiceContainer): void {
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
      .getSystemInfoViewmodel(apiInfo),
    bodyRenderer: (bodyProps: SystemInfo.SystemInfoDialogBodyProps) => {
      return (<SystemInfo.SystemInfoDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: SystemInfo.SystemInfoDialogFooterProps) => {
      return (<SystemInfo.SystemInfoDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialog(statusProps);
}
