import { MtgSetDto } from "../../../dto";
import { BaseDialogFooterProps, SaveCancelResetFooter } from "../../base/base-dialog";

export function MtgSetDialogFooter(props: BaseDialogFooterProps<MtgSetDto>) {
  // #region Rendering --------------------------------------------------------
  return (
    <SaveCancelResetFooter<MtgSetDto>
      {...props}
      cancelButtonLabel="Close"
      showCommitButton={false}
    />
  );
  // #endregion
}
