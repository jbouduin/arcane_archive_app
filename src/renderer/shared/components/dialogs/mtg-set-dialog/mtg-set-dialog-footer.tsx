import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { SaveCancelResetFooterNew } from "../../base/base-dialog";
import { MtgSetDialogFooterProps } from "./mtg-set-dialog.props";

export function MtgSetDialogFooter(props: MtgSetDialogFooterProps) {
  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooterNew<MtgSetDto, MtgSetDetailViewmodel>
      {...props}
      cancelButtonLabel="Close"
      showCommitButton={false}
    />
  );
  // #endregion
}
