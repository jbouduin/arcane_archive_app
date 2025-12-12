import { PreferencesDto } from "../../../../../common/dto";
import { useServices } from "../../../../hooks";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function PreferencesDialogFooter(props: BaseDialogFooterProps<PreferencesDto>) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, _dto: PreferencesDto): Promise<void> {
    serviceContainer.configurationService.updateLocalPreferences(props.viewmodel.dto);
    if (props.onClose) {
      props.onClose(event);
    }
    return Promise.resolve();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<PreferencesDto>
      {...props}
      showResetButton={true}
      commitButtonLabel="Save"
      commitButtonIcon="floppy-disk"
      onCommitButtonClick={saveClick}
    />
  );
  // #endregion
}
