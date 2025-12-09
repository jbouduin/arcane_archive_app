import { IconName, MaybeElement } from "@blueprintjs/core";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";

export interface SaveCancelResetFooterProps<T extends object> extends BaseDialogFooterProps<T> {
  showResetButton?: boolean;
  /**
   * Default: Undo changes
   */
  resetButtonLabel?: string;
  /**
   * Default: refresh
   */
  resetButtonIcon?: IconName | MaybeElement;
  /**
   * Default: Save
   */
  commitButtonLabel?: string;
  /**
   * Default floppy-disk
   */
  commitButtonIcon?: IconName | MaybeElement;
  /**
   * Default: Cancel
   */
  cancelButtonLabel?: string;
  /**
   * Default: cross
   */
  cancelButtonIcon?: IconName | MaybeElement;
  onCommitButtonClick: (event: React.SyntheticEvent<HTMLElement, Event>, dto: T) => Promise<void>;
}
