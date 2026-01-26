import { cloneDeep } from "lodash";
import { PreferencesDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import * as Preferences from "../preferences-dialog";

export function showPreferencesDialog(serviceContainer: IServiceContainer, preferences: PreferencesDto): void {
  const uiSettingsProps: Preferences.PreferencesDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory
      .getPreferencesViewmodel(cloneDeep(preferences)),
    bodyRenderer: (bodyProps: Preferences.PreferencesDialogBodyProps) => {
      return (<Preferences.PreferencesDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: Preferences.PreferencesDialogFooterProps) => {
      return (<Preferences.PreferencesDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.overlayService.openDialog(uiSettingsProps);
}
