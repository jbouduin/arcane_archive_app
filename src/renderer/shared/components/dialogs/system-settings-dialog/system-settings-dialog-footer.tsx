import { SystemSettingsDto } from "../../../../../common/dto";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function SystemSettingsDialogFooter(props: BaseDialogFooterProps<SystemSettingsDto>) {
  // #region Event handling ---------------------------------------------------
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, _dto: SystemSettingsDto): Promise<void> {
    if (props.onClose) {
      props.onClose(event);
    }
    return Promise.resolve();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  // TODO show reset AND factory default buttons
  return (
    <SaveCancelResetFooter<SystemSettingsDto>
      {...props}
      showResetButton={true}
      resetButtonIcon="wrench-redo"
      resetButtonLabel="Factory Defaults"
      commitButtonLabel="Save"
      commitButtonIcon="floppy-disk"
      onCommitButtonClick={saveClick}
    />
  );
  // #endregion
}
