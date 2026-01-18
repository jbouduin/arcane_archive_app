import { noop } from "lodash";
import { PreferencesDto } from "../../../../../common/dto";
import { useServices, useSession } from "../../../../hooks";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { PreferencesDialogFooterProps } from "./preferences-dialog.props";

export function PreferencesDialogFooter(props: PreferencesDialogFooterProps): JSX.Element {
  // #region Hooks ------------------------------------------------------------
  const { configurationService, arcaneArchiveProxy } = useServices();
  const { loggedIn } = useSession();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, _dto: PreferencesDto): Promise<void> {
    return configurationService
      .savePreferences(arcaneArchiveProxy, props.viewmodel.dto, loggedIn)
      .then(
        (_resp: PreferencesDto) => {
          if (props.onClose) {
            props.onClose(event);
          }
        },
        noop
      );
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <DefaultDialogFooter
      {...props}
      showResetButton={true}
      commitButtonLabel="Save"
      commitButtonIcon="floppy-disk"
      onCommitButtonClick={saveClick}
    />
  );
  // #endregion
}
