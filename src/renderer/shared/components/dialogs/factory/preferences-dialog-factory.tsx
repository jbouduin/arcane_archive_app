import { IServiceContainer } from "../../../context";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { PreferencesDialogBody } from "../preferences-dialog/preferences-dialog-body";
import { PreferencesDialogFooter } from "../preferences-dialog/preferences-dialog-footer";

export function showPreferencesDialog(serviceContainer: IServiceContainer): void {
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  const uiSettingsProps: BaseDialogProps<String> = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(new String("preferences")),
    // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
    bodyRenderer: (bodyProps: BaseDialogBodyProps<String>) => {
      return (<PreferencesDialogBody {...bodyProps} />);
    },
    // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
    footerRenderer: (footerProps: BaseDialogFooterProps<String>) => {
      return (<PreferencesDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(uiSettingsProps);
}
