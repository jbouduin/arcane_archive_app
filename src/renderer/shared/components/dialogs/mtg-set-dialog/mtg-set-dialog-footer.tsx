import { MtgSetDto } from "../../../dto";
import { MtgSetDetailViewmodel } from "../../../viewmodel";
import { DefaultDialogFooter } from "../../base/base-dialog";
import { MtgSetDialogFooterProps } from "./mtg-set-dialog.props";

export function MtgSetDialogFooter(props: MtgSetDialogFooterProps) {
  //#region Rendering ---------------------------------------------------------
  return (
    <DefaultDialogFooter<MtgSetDto, MtgSetDetailViewmodel>
      {...props}
      cancelButtonLabel="Close"
      showCommitButton={false}
    />
  );
  //#endregion
}
