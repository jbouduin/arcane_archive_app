import { Icon } from "@blueprintjs/core";
import { ApiInfoContextType } from "../../../context";
import { ISettingsViewmodelFactory } from "../../../viewmodel";
import { SystemInfoDialogBody } from "./system-info-dialog-body";
import { SystemInfoDialogFooter } from "./system-info-dialog-footer";
import * as DialogProps from "./system-info-dialog.props";

function getSystemInfoDialogPropsImpl(
  apiInfo: ApiInfoContextType,
  settingsViewmodelFactory: ISettingsViewmodelFactory
): DialogProps.SystemInfoDialogProps {
  const statusProps: DialogProps.SystemInfoDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    title: "System Status",
    icon: (<Icon icon="info-sign" intent="primary" />),
    viewmodel: settingsViewmodelFactory.getSystemInfoViewmodel(apiInfo),
    bodyRenderer: (bodyProps: DialogProps.SystemInfoDialogBodyProps) => {
      return (<SystemInfoDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DialogProps.SystemInfoDialogFooterProps) => {
      return (<SystemInfoDialogFooter {...footerProps} />);
    }
  };
  return statusProps;
}

export const SystemInfoDialogPropsFacotry = {
  getSystemInfoDialogProps: getSystemInfoDialogPropsImpl
};
