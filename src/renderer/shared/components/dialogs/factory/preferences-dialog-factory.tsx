import { cloneDeep } from "lodash";
import { IServiceContainer } from "../../../context";
import * as Preferences from "../preferences-dialog";

export function showPreferencesDialog(serviceContainer: IServiceContainer): void {
  const uiSettingsProps: Preferences.PreferencesDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(cloneDeep(serviceContainer.configurationService.preferences)),
    bodyRenderer: (bodyProps: Preferences.PreferencesDialogBodyProps) => {
      return (<Preferences.PreferencesDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: Preferences.PreferencesDialogFooterProps) => {
      return (<Preferences.PreferencesDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialogNew(uiSettingsProps);
}
