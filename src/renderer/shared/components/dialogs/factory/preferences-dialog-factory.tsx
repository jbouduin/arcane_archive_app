import { cloneDeep } from "lodash";
import { PreferencesDto } from "../../../../../common/dto";
import { IServiceContainer } from "../../../context";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "../../base/base-dialog";
import { PreferencesDialogBody } from "../preferences-dialog/preferences-dialog-body";
import { PreferencesDialogFooter } from "../preferences-dialog/preferences-dialog-footer";

export function showPreferencesDialog(serviceContainer: IServiceContainer): void {
  const uiSettingsProps: BaseDialogProps<PreferencesDto> = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: serviceContainer.viewmodelFactoryService.settingsViewmodelFactory.getPreferencesViewmodel(cloneDeep(serviceContainer.configurationService.preferences)),
    bodyRenderer: (bodyProps: BaseDialogBodyProps<PreferencesDto>) => {
      return (<PreferencesDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: BaseDialogFooterProps<PreferencesDto>) => {
      return (<PreferencesDialogFooter {...footerProps} />);
    }
  };
  serviceContainer.dialogService.openDialog(uiSettingsProps);
}
