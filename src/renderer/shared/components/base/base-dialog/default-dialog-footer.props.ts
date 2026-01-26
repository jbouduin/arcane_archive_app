import { IconName, MaybeElement } from "@blueprintjs/core";
import React, { ReactNode } from "react";
import { BaseViewmodel } from "../../../viewmodel";
import { BaseDialogFooterProps } from "./base-dialog.props";

export interface DefaultDialogFooterProps<Dto extends object, Vm extends BaseViewmodel<Dto>>
  extends BaseDialogFooterProps<Dto, Vm> {
  /**
   * Any additional buttons rendered to the right of the reset button
   */
  additionalLeftButtons?: ReactNode;
  /**
   * Show the reset button
   */
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
   * Default: true
   */
  showCommitButton?: boolean;
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
  /**
   * defaults to props.onClose
   */
  onCommitButtonClick?: (event: React.SyntheticEvent<HTMLElement, Event>, dto: Dto) => Promise<void>;
}
