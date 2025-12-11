import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

// eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
export function SystemSettingsDialogFooter(props: BaseDialogFooterProps<String>) {
  // #region Event handling ---------------------------------------------------
  // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
  function saveClick(event: React.SyntheticEvent<HTMLElement, Event>, _dto: String): Promise<void> {
    if (props.onClose) {
      props.onClose(event);
    }
    return Promise.resolve();
  }
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    // eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
    <SaveCancelResetFooter<String>
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
