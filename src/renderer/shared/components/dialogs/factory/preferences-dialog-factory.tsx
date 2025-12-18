import { cloneDeep } from "lodash";
import { IServiceContainer } from "../../../context";
import { PreferencesDialogBody } from "../preferences-dialog/preferences-dialog-body";
import { PreferencesDialogFooter } from "../preferences-dialog/preferences-dialog-footer";
import { PreferencesDialogBodyProps, PreferencesDialogFooterProps, PreferencesDialogProps } from "../preferences-dialog/preferences-dialog.props";

export function showPreferencesDialog(serviceContainer: IServiceContainer): void {
  const uiSettingsProps: PreferencesDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(cloneDeep(serviceContainer.configurationService.preferences)),
    bodyRenderer: (bodyProps: PreferencesDialogBodyProps) => {
      return (<PreferencesDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: PreferencesDialogFooterProps) => {
      return (<PreferencesDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialog(uiSettingsProps);
}
