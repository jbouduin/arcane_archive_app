import { cloneDeep } from "lodash";
import { PreferencesDto } from "../../../../../common/dto";
import { ISettingsViewmodelFactory } from "../../../viewmodel";
import { PreferencesDialogBody } from "./preferences-dialog-body";
import { PreferencesDialogFooter } from "./preferences-dialog-footer";
import * as DialogProps from "./preferences-dialog.props";

function getPreferencesDialogPropsImpl(
  preferences: PreferencesDto, settingsViewmodelFactory: ISettingsViewmodelFactory
): DialogProps.PreferencesDialogProps {
  const dialogProps: DialogProps.PreferencesDialogProps = {
    isOpen: true,
    isCloseButtonShown: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: false,
    title: "Preferences",
    viewmodel: settingsViewmodelFactory
      .getPreferencesViewmodel(cloneDeep(preferences)),
    bodyRenderer: (bodyProps: DialogProps.PreferencesDialogBodyProps) => {
      return (<PreferencesDialogBody {...bodyProps} />);
    },
    footerRenderer: (footerProps: DialogProps.PreferencesDialogFooterProps) => {
      return (<PreferencesDialogFooter {...footerProps} />);
    }
  };
  return dialogProps;
}

export const PreferencesDialogPropsFactory = {
  getPreferencesDialogProps: getPreferencesDialogPropsImpl
};
