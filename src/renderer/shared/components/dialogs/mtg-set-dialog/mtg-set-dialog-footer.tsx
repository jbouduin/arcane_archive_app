import { SaveCancelResetFooter } from "../../base/base-dialog";
import { MtgSetDialogFooterProps } from "./mtg-set-dialog.props";

export function MtgSetDialogFooter(props: MtgSetDialogFooterProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter
      {...props}
      cancelButtonLabel="Close"
      showCommitButton={false}
    />
  );
  // #endregion
}
