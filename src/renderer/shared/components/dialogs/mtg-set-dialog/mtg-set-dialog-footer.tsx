import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooter } from "../../base/base-dialog";
import { MtgSetDialogFooterProps } from "./mtg-set-dialog.props";

export function MtgSetDialogFooter(props: MtgSetDialogFooterProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<MtgSetDto, MtgSetDetailViewmodel>
      {...props}
      cancelButtonLabel="Close"
      showCommitButton={false}
    />
  );
  // #endregion
}
