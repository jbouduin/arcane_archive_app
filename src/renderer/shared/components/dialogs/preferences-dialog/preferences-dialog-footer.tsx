import { PreferencesDto } from "../../../../../common/dto";
import { useServices, useSession } from "../../../../hooks";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { PreferencesDialogFooterProps } from "./preferences-dialog.props";

export function PreferencesDialogFooter(props: PreferencesDialogFooterProps) {
  // #region Hooks ------------------------------------------------------------
  const serviceContainer = useServices();
  const { loggedIn } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, _dto: PreferencesDto): Promise<void> {
    serviceContainer.configurationService.savePreferences(
      serviceContainer.arcaneArchiveProxy,
      props.viewmodel.dto,
      loggedIn
    );
    if (props.onClose) {
      props.onClose(event);
    }
    return Promise.resolve();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter
      {...props}
      showResetButton={true}
      commitButtonLabel="Save"
      commitButtonIcon="floppy-disk"
      onCommitButtonClick={saveClick}
    />
  );
  // #endregion
}
